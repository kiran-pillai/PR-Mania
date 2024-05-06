import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserInfo } from '@/context/authContext';

interface ChatSearchResultsProps {
  friends: UserInfo[];
}

const ChatSearchResults = (props: ChatSearchResultsProps) => {
  const { friends } = props;
  return (
    <div className="flex-col space-y-5">
      {/* <div className="flex items-center">
        <Label className="mr-auto" htmlFor={'4'}>
          {'John Doe'}
        </Label>
        <Checkbox className="ml-auto" id={'32'} />
      </div>
      <div className="flex items-center space-x-2 gap-2">
        <Label className="mr-auto" htmlFor={'21'}>
          {'Steven'}
        </Label>
        <Checkbox className="ml-auto" id={'21'} />
      </div> */}
      {friends?.map((friend: any) => (
        <div className="flex items-center">
          <Label className="mr-auto" htmlFor={friend?._id}>
            {friend?.name}
          </Label>
          <Checkbox className="ml-auto" id={friend?._id} />
        </div>
      ))}
    </div>
  );
};

export default ChatSearchResults;
