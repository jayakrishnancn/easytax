function FieldRow({ children, isHeader = false }: any) {
  const classes = "py-4 px-6 " + (!isHeader ? "text-gray-900" : "");
  return <tr className={classes}>{children}</tr>;
}

export default FieldRow;
