import { LinkIconFill } from '@/assets/icons';
import Button from '@/components/button';
import { DialogClose, DialogFooter } from '@/components/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/drawer';
import Input from '@/components/input';
import Spacing from '@/components/spacing';

function UrlEditDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="primary" size="lg" className="flex-1">
          URL 수정하기
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="space-y-2">
          <DrawerTitle className="heading-1">URL 수정하기</DrawerTitle>
          <DrawerDescription className="body-2-medium text-text-neutral-secondary">
            상품 링크를 넣으면
            <br />
            이미지, 상품명, 가격을 다시 불러와요.
          </DrawerDescription>
        </DrawerHeader>

        <Spacing size={12} />

        <Input label="링크 URL" placeholder="복사한 링크를 입력해주세요." left={<LinkIconFill />} />

        <Spacing size={16} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="primary" size="lg" className="flex-1">
              정보 다시 불러오기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default UrlEditDrawer;
