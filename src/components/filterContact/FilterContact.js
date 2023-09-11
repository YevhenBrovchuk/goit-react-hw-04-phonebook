import { Div, Input } from './FilterContact.styled';

export const FilterContact = ({ filter, onChangeFilter }) => {
  return (
    <Div>
      Find contacts by name
      <Input
        type="text"
        value={filter}
        onChange={evt => onChangeFilter(evt.target.value)}
        placeholder="Filter"
      ></Input>
    </Div>
  );
};
