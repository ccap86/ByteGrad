import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";

export default function CountButton({ type, setCount }) {
  const handleClick = () => {
    setCount((prev) => {
      if (type === "minus") {
        //   my code to fix limit
        //     if (prev > 1) {
        //       return prev - 1;
        //     }
        //     return 0;
        //   } else {
        //     return prev + 1;
        //   }
        const newCount = prev - 1;
        if (newCount < 0) {
          return 0;
        }
        return newCount;
      } else {
        return prev + 1;
      }
    });
  };
  return (
    <button onClick={handleClick} className="count-btn">
      {type === "minus" ? (
        <MinusIcon className="count-btn-icon" />
      ) : (
        <PlusIcon className="count-btn-icon" />
      )}
      {/* {type === "minus" && <MinusIcon className="count-btn-icon" />}
      {type === "plus" && <PlusIcon className="count-btn-icon" />} */}
    </button>
  );
}
