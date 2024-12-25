export default function Error({ title, message, onConfirm }) {
    return (
      <div className="text-center w-[200px] h-auto bg-red-400 p-9 rounded-md ">
        <h2 className="font-bold ">{title}</h2>
        <p className="text-white font-bold">{message}</p>
        {onConfirm && (
          <div id="confirmation-actions">
            <button onClick={onConfirm} className="button">
              Okay
            </button>
          </div>
        )}
      </div>
    );
  }