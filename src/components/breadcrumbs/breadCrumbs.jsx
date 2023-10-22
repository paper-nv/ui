const BreadCrumbs = () => {
  const crumbs = location.pathname.split("/");
  delete crumbs[0];
  return (
    <div className="breadcrumbs">
      {crumbs.map((breadcrumb, index) => {
        return <span key={index}>{breadcrumb}</span>;
      })}
    </div>
  );
};

export default BreadCrumbs;
