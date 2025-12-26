"use client";
export default function DeleteBtn(props: any) {
  return (
    <>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          props.deleteFn(props.id);
        }}
      >
         <i className="bi bi-trash"></i>
      </button>
    </>
  );
}