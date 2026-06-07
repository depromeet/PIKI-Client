import { EditIconFill } from '@/assets/icons';
import Button from '@/components/button';
import Input from '@/components/input';
import Spinner from '@/components/spinner';

type NicknameFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onCheckDuplicate: () => void;
  isChecking: boolean;
  isError: boolean;
};

function NicknameField({
  value,
  onChange,
  onCheckDuplicate,
  isChecking,
  isError,
}: NicknameFieldProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="heading-2 text-gray-950">닉네임</h2>
      <Input
        name="nickname"
        value={value}
        maxLength={10}
        autoCorrect="off"
        onChange={event => onChange(event.target.value)}
        aria-invalid={isError}
        {...(isError ? { helperText: '이미 사용 중인 닉네임입니다.' } : {})}
        right={<EditIconFill className="size-5 text-icon-neutral-secondary" />}
      />
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="w-full"
        onClick={onCheckDuplicate}
        disabled={isChecking}
      >
        {isChecking ? <Spinner /> : '닉네임 중복 체크 (임시)'}
      </Button>
    </div>
  );
}

export default NicknameField;
