function TokenTab({ icon, title }) {
  return (
    <div className="flex items-center justify-center rounded-2xl p-4">
      <img src={icon} alt={title} className="w-14 h-14 mb-2" />
      <h3 className="text-lg font-semibold mx-4">{title}</h3>
    </div>
  );
}

export default TokenTab;
