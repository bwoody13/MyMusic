import { CustomOptionType } from "../Classes/CustomOption";

type CustomOptionProps = {
    innerProps: any; // These are props passed by react-select, typing is generally any
    data: CustomOptionType;
  }

const CustomOption: React.FC<CustomOptionProps> = ({ innerProps, data }) => (
    <div {...innerProps}>
      <img src={data.image} alt={data.name} style={{ width: 50, height: 50, marginRight: 10 }} />
      {data.name} by {data.authors}
    </div>
  );
  
  export default CustomOption;