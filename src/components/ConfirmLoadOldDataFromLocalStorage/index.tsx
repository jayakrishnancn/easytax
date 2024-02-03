interface ConfirmLoadOldDataFromLocalStorageProps {
  onClose: () => void;
  onConfirm: () => void;
}
function ConfirmLoadOldDataFromLocalStorage(
  props: ConfirmLoadOldDataFromLocalStorageProps
) {
  return (
    <div className="p-10 max-w-5xl mx-auto bg-orange-200 rounded-md">
      <span className="font-bold">Confirm!</span> Do you want to confinue where
      you left off?
      <ExampleAdditionalContent {...props} />
    </div>
  );
}

export default ConfirmLoadOldDataFromLocalStorage;

function ExampleAdditionalContent(
  props: ConfirmLoadOldDataFromLocalStorageProps
) {
  return (
    <>
      <div className="mb-4 mt-2 text-sm text-orange-700 dark:text-orange-800">
        We found few details in your browser cache. By clicking Yes, we will
        prefill the fields which you already filled last time. Clicking Cancel
        will clear all fields and open fresh page.
      </div>
      <div className="flex">
        <button
          type="button"
          onClick={props.onConfirm}
          className="mr-2 inline-flex items-center rounded-lg bg-orange-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 dark:bg-orange-800 dark:hover:bg-orange-900"
        >
          Yes, Continue where I left off last time.
        </button>
        <button
          type="button"
          onClick={props.onClose}
          className="rounded-lg border border-orange-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-orange-700 hover:bg-orange-800 hover:text-white focus:ring-4 focus:ring-orange-300 dark:border-orange-800 dark:text-orange-800 dark:hover:text-white"
        >
          No, Show me a fresh page.
        </button>
      </div>
    </>
  );
}
