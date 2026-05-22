type PasswordInputProps = {
    label: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PasswordInput = ({ label, name, placeholder, value, onChange, }: PasswordInputProps) => {
    return (
        <div>
            <label className="text-xs text-gray-600 font-medium">
                {label}
            </label>

            <input
                type="password"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 outline-none focus:ring-1 focus:ring-blue-950"
            />
        </div>
    );
};