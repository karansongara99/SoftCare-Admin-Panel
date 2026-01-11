"use client";
type Props = {
  deleteFn: (id: number) => Promise<void> | void;
  id: number;
};
export default function DeleteBtn({ deleteFn, id }: Props) {
  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => {
        deleteFn(id);
      }}
    >
      <i className="bi bi-trash"></i>
    </button>
  );
}