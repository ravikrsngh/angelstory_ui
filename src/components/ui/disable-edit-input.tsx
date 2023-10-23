import { IconEdit } from "@tabler/icons-react";

export default function DisableEditInput() {
  return (
    <div>
      <label htmlFor=""></label>
      <div>
        <input type="text" />
        <IconEdit />
      </div>
    </div>
  );
}
