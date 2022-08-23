function TableCell({
  children,
  bold = false,
  className: classes = "",
  ...rest
}: any) {
  return (
    <td
      className={"py-4 px-6 " + (bold ? "font-bold" : "") + classes}
      {...rest}
    >
      {children || ""}
    </td>
  );
}
export default TableCell;
