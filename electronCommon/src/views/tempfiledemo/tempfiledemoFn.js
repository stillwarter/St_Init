export function createtempfiledemoFn(context) {
  const { tempfiledemoConst } = context;

  const { searchText } = tempfiledemoConst;

  function searchFile() {
    console.log(searchText.value);
  }
  return { searchFile };
}
