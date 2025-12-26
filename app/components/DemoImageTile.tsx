// app/components/DemoImageTile.tsx
export default function DemoImageTile() {
  return (
    <div className="card bg-base-100 shadow-sm border border-accent/10">
      <div className="card-body">
        <h3 className="card-title text-accent">Image adjustment demo</h3>
        <p className="text-neutral/80">
          Pre-sized formats for Instagram, Twitter, and Facebook—instant previews.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="border border-accent/10 rounded-lg p-4">
            <div className="text-sm text-neutral/60 mb-2">Original</div>
            <div className="h-32 bg-neutral/10 rounded flex items-center justify-center text-neutral/60">
              1920×1080
            </div>
          </div>
          <div className="border border-accent/10 rounded-lg p-4">
            <div className="text-sm text-neutral/60 mb-2">Instagram Square</div>
            <div className="h-32 bg-neutral/10 rounded flex items-center justify-center text-neutral/60">
              1080×1080
            </div>
          </div>
        </div>
        <div className="card-actions mt-4">
          <a href="/social-share" className="btn btn-outline border-primary text-primary btn-sm">
            Try image formats
          </a>
        </div>
      </div>
    </div>
  )
}
