function TableCell({ children, bold = false, ...rest }: any) {
  return (
    <td className={"py-4 px-6 " + (bold ? "font-bold" : "")} {...rest}>
      {children}
    </td>
  );
}
export default TableCell;
