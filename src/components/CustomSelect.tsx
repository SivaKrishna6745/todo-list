import { useEffect, useRef, useState } from 'react';

export type Option<T> = {
    label: string | undefined;
    value: T;
};
interface CustomSelectProps<T> {
    selectedValue?: Option<T>;
    options: Option<T>[];
    onSelect: (value: T) => void;
    placeholder?: string;
}

const CustomSelect = <T,>({ selectedValue, options, onSelect, placeholder }: CustomSelectProps<T>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Option<T> | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        if (selectedValue) {
            setSelectedOption(selectedValue);
        }
    }, [selectedValue]);
    const handleOptionClick = (option: Option<T>) => {
        setSelectedOption(option);
        onSelect(option.value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-48" ref={dropdownRef}>
            <button
                type="button"
                className="flex justify-between w-full items-center px-4 py-2 text-md font-medium text-gray-700 bg-white border border-gray-400 rounded-md shadow-sm hover:bg-gray-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption ? selectedOption.label : placeholder}</span>
                <svg
                    className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                        {options.map((option) => (
                            <a
                                key={option.label}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOptionClick(option);
                                }}
                                className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                            >
                                {option.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
