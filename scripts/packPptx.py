import sys
import os
import json
import shutil
import zipfile
import xml.etree.ElementTree as ET
from PIL import Image

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_IMAGES = os.path.join(ROOT_DIR, "public", "images")
MEDIA_CACHE = os.path.join(ROOT_DIR, ".tmp-pptx-media")
BASE_PPTX = os.path.join(MEDIA_CACHE, "blank_base.pptx")


def prepare_media():
    os.makedirs(MEDIA_CACHE, exist_ok=True)
    manifest = {}
    for dirpath, _, filenames in os.walk(PUBLIC_IMAGES):
        for fn in filenames:
            if not fn.lower().endswith((".webp", ".png", ".jpg", ".jpeg")):
                continue
            full_path = os.path.join(dirpath, fn)
            rel_path = os.path.relpath(full_path, os.path.join(ROOT_DIR, "public")).replace("\\", "/")
            safe_name = rel_path.replace("/", "_").rsplit(".", 1)[0] + ".png"
            out_path = os.path.join(MEDIA_CACHE, safe_name)
            with Image.open(full_path) as im:
                rgba = im.convert("RGBA")
                # Composite onto white/light background if transparent edges look dark, or keep RGBA PNG
                rgba.save(out_path, "PNG")
                w, h = rgba.size
            manifest[rel_path] = {
                "file": safe_name,
                "path": out_path.replace("\\", "/"),
                "width": w,
                "height": h
            }
    manifest_path = os.path.join(MEDIA_CACHE, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"Prepared {len(manifest)} PNG media files in {MEDIA_CACHE}")


def extract_skeleton(skeleton_dir):
    if os.path.exists(skeleton_dir):
        shutil.rmtree(skeleton_dir)
    os.makedirs(skeleton_dir, exist_ok=True)
    with zipfile.ZipFile(BASE_PPTX, "r") as z:
        for member in z.namelist():
            if member.startswith(("ppt/slides/", "ppt/notesSlides/", "ppt/media/")):
                continue
            z.extract(member, skeleton_dir)
    print(f"Extracted clean OpenXML skeleton to {skeleton_dir}")


def pack_and_validate(build_dir, out_pptx):
    # Validate all XML files inside build_dir before zipping
    xml_count = 0
    for dirpath, _, filenames in os.walk(build_dir):
        for fn in filenames:
            if fn.endswith((".xml", ".rels")):
                full_path = os.path.join(dirpath, fn)
                try:
                    ET.parse(full_path)
                    xml_count += 1
                except Exception as e:
                    raise RuntimeError(f"Invalid XML in {full_path}: {e}")

    os.makedirs(os.path.dirname(out_pptx), exist_ok=True)
    if os.path.exists(out_pptx):
        os.remove(out_pptx)

    with zipfile.ZipFile(out_pptx, "w", zipfile.ZIP_DEFLATED) as zf:
        for dirpath, _, filenames in os.walk(build_dir):
            for fn in filenames:
                full_path = os.path.join(dirpath, fn)
                arcname = os.path.relpath(full_path, build_dir).replace("\\", "/")
                zf.write(full_path, arcname)

    print(f"Packed {out_pptx} ({xml_count} XML parts validated)")


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "--prepare":
        prepare_media()
        extract_skeleton(os.path.join(MEDIA_CACHE, "skeleton"))
    elif cmd == "--pack":
        pack_and_validate(sys.argv[2], sys.argv[3])
