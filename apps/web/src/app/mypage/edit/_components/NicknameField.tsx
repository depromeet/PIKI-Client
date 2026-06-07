import { EditIconFill } from '@/assets/icons';
import Input from '@/components/input';

function NicknameField() {
  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="heading-2 text-gray-950">닉네임</h2>
      <Input
        defaultValue="게으른 사자"
        readOnly
        right={<EditIconFill className="size-5 text-icon-neutral-secondary" />}
      />
    </div>
  );
}

export default NicknameField;
