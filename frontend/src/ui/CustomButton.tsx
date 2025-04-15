export type CustomButtonProps = {
  text: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const CustomButton = ({
  text,
  onClick,
  disabled = false,
  type = 'button',
}: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 text-white font-semibold border-2 rounded-md ${
        disabled
          ? 'bg-[#cbc8f3] cursor-not-allowed border-[#cbc8f3]'
          : 'bg-[#6355F0] hover:bg-[#7a6df0] cursor-pointer border-[#6355F0] hover:border-[#7a6df0]'
      }`}
    >
      {text}
    </button>
  )
}

export default CustomButton
