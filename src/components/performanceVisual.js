/**
 * Renders static side-by-side real-world examples comparing bandwidth and latency
 * without interactive simulation controls.
 */
export function performanceExamplesVisual() {
  return `
    <section class="perf-examples-grid" aria-label="Actual examples of bandwidth and latency">
      <article class="perf-example-card">
        <div class="perf-card-header">
          <span class="perf-card-tag perf-tag-bandwidth">ACTUAL EXAMPLE · BANDWIDTH (CAPACITY)</span>
        </div>
        <h3 class="perf-card-title">Downloading a 100 MB (800 Mb) Class Video</h3>
        <div class="perf-meters">
          <div class="perf-meter-row">
            <div class="perf-meter-meta">
              <span class="perf-meter-name">20 Mbps Home Broadband</span>
              <span class="perf-meter-stat">~40 sec</span>
            </div>
            <div class="perf-meter-track" aria-hidden="true">
              <div class="perf-meter-fill perf-fill-muted" style="width: 20%"></div>
            </div>
          </div>
          <div class="perf-meter-row">
            <div class="perf-meter-meta">
              <span class="perf-meter-name">100 Mbps School Fiber</span>
              <span class="perf-meter-stat perf-stat-good">~8 sec (5× faster)</span>
            </div>
            <div class="perf-meter-track" aria-hidden="true">
              <div class="perf-meter-fill perf-fill-blue" style="width: 100%"></div>
            </div>
          </div>
        </div>
        <p class="perf-card-note">Wider capacity carries more bits every second, so large files finish sooner.</p>
      </article>

      <article class="perf-example-card">
        <div class="perf-card-header">
          <span class="perf-card-tag perf-tag-latency">ACTUAL EXAMPLE · LATENCY (DELAY)</span>
        </div>
        <h3 class="perf-card-title">Opening a Link on Two 100 Mbps Plans</h3>
        <div class="perf-meters">
          <div class="perf-meter-row">
            <div class="perf-meter-meta">
              <span class="perf-meter-name">Local Fiber (100 Mbps)</span>
              <span class="perf-meter-stat perf-stat-good">~15 ms · Instant</span>
            </div>
            <div class="perf-meter-track" aria-hidden="true">
              <div class="perf-meter-fill perf-fill-teal" style="width: 4%"></div>
            </div>
          </div>
          <div class="perf-meter-row">
            <div class="perf-meter-meta">
              <span class="perf-meter-name">Satellite Internet (100 Mbps)</span>
              <span class="perf-meter-stat perf-stat-warn">~600 ms · Noticeable wait</span>
            </div>
            <div class="perf-meter-track" aria-hidden="true">
              <div class="perf-meter-fill perf-fill-amber" style="width: 100%"></div>
            </div>
          </div>
        </div>
        <p class="perf-card-note">Same 100 Mbps capacity, yet satellite pauses because packets travel ~36,000 km to orbit and back.</p>
      </article>
    </section>
  `;
}

