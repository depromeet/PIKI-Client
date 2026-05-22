import HeartIconFill from '@/assets/icons/fill/heart.svg';
import TrashIconFill from '@/assets/icons/fill/trash.svg';

type FabMenuProps = {
  onAddItem: () => void;
  onDelete: () => void;
};

function FabMenu({ onAddItem, onDelete }: FabMenuProps) {
  return (
    <div className="absolute right-0 bottom-full mb-3 flex w-[184px] flex-col items-start rounded-2xl border border-[#DCDEE2] bg-white p-2 shadow-[0_1px_8px_0_rgba(0,0,0,0.10)]">
      <button
        type="button"
        onClick={onAddItem}
        className="flex items-start gap-3 self-stretch rounded-xl px-4 py-3 active:bg-gray-50"
      >
        <HeartIconFill width={20} height={20} className="shrink-0 text-gray-600" />
        {/* TODO: 아이템 추가 페이지 생기면 연결 */}
        <span className="body-1-semibold flex-1 text-left text-[#2D3037]">아이템 추가하기</span>
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="flex items-start gap-3 self-stretch rounded-xl px-4 py-3 active:bg-gray-50"
      >
        <TrashIconFill width={20} height={20} className="shrink-0 text-gray-600" />
        <span className="body-1-semibold flex-1 text-left text-[#2D3037]">삭제하기</span>
      </button>
    </div>
  );
}

export default FabMenu;
