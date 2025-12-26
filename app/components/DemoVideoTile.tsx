// app/components/DemoVideoTile.tsx
export default function DemoVideoTile() {
  return (
    <div className="card bg-base-100 shadow-sm border border-accent/10">
      <div className="card-body">
        <h3 className="card-title text-accent">Video compression demo</h3>
        <p className="text-neutral/80">
          See how size drops with optimized settings—ideal for quick sharing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="border border-accent/10 rounded-lg p-4">
            <div className="text-sm text-neutral/60 mb-2">Original</div>
            <div className="h-32 bg-neutral/10 rounded flex items-center justify-center text-neutral/60">
              Placeholder
            </div>
            <div className="mt-2 text-sm">
              <span className="text-neutral/70">Size:</span> 48.2 MB
            </div>
          </div>
          <div className="border border-accent/10 rounded-lg p-4">
            <div className="text-sm text-neutral/60 mb-2">Compressed</div>
            <div className="h-32 bg-neutral/10 rounded flex items-center justify-center text-neutral/60">
              Placeholder
            </div>
            <div className="mt-2 text-sm flex items-center gap-2">
              <span className="text-neutral/70">Size:</span> 11.7 MB
              <span className="badge badge-success">-76%</span>
            </div>
          </div>
        </div>
        <div className="card-actions mt-4">
          <a href="/video-upload" className="btn btn-primary btn-sm">Try compression</a>
        </div>
      </div>
    </div>
  )
}
