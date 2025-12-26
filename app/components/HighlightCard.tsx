// app/components/HighlightCard.tsx
type Props = {
  title: string
  description: string
  badge?: string
}

export default function HighlightCard({ title, description, badge }: Props) {
  return (
    <div className="card bg-base-100 shadow-sm border border-accent/10">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h3 className="card-title text-accent">{title}</h3>
          {badge && <span className="badge badge-primary">{badge}</span>}
        </div>
        <p className="text-neutral/80">{description}</p>
      </div>
    </div>
  )
}
