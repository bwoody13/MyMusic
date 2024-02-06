import Select from "react-select";
import { CustomOptionType } from "../Classes/CustomOption";
import CustomOption from "./CustomOption";

type CustomSelectProps = {
    options: CustomOptionType[];
    onSelectChange: (id: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onSelectChange }) => (
    <Select
        options={options}
        getOptionLabel={(option) => `${option.name} by ${option.authors}`}
        getOptionValue={(option) => option.id}
        components={{ Option: CustomOption }}
        onChange={(option) => option && onSelectChange(option.id)}
    />
);

export default CustomSelect;