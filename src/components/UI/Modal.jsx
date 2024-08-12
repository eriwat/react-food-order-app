import { useEffect, useRef } from "react";

export default function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);
  return (
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>
  );
}

// import { useRef, useImperativeHandle, forwardRef } from "react";

// import Button from "./Button";

// const Modal = forwardRef(function Modal(
//   { children, title, className = "" },
//   ref
// ) {
//   const dialog = useRef();

//   useImperativeHandle(ref, () => {
//     return {
//       open() {
//         dialog.current.showModal();
//       },
//     };
//   });
//   return (
//     <dialog className={`modal ${className}`} ref={dialog}>
//       <form method="dialog">
//         <h2>{title}</h2>
//         <div>{children}</div>
//       </form>
//     </dialog>
//   );
// });

// export default Modal;
