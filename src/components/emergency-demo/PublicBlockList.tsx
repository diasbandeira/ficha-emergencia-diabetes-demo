export type PublicBlockItem = {
  id: string;
  label: string;
  value: string;
};

export default function PublicBlockList({ items }: { items: PublicBlockItem[] }) {
  return (
    <dl className="public-list">
      {items.map((item) => (
        <div className="public-row" key={item.id}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
