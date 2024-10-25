"use client";

import { LucideGithub } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function getThaiNumberFromDigits(num: number) {
  switch (num) {
    case 1:
      return "nıng";
    case 2:
      return "song";
    case 3:
      return "saam";
    case 4:
      return "sii";
    case 5:
      return "haa";
    case 6:
      return "hok";
    case 7:
      return "djet";
    case 8:
      return "bpaat";
    case 9:
      return "gaao";
    case 10:
      return "sip";
    case 20: return "yii-sip";
    case 30: return "saam-sip";
    case 40: return "sii-sip";
    case 50: return "haa-sip";
    case 60: return "hok-sip";
    case 70: return "djet-sip";
    case 80: return "bpaat-sip";
    case 90: return "gaao-sip";

    // not for a hundred per-se, just the suffix
    case 100:
      return "roy";
    case 1_000:
      return "pahn";
    case 10_000:
      return "mıhn";
    case 100_000:
      return "sehn";
    case 1_000_000:
      return "lahrn";
  }
}

function getDigits(num: number) {
  const digits = [];

  do {
    digits.push(num % 10);
    num = Math.floor(num / 10);
  } while (num > 0);
  return digits;
}

function getThaiNumberTransliteration(num?: number): string {
  if (!num || num < 0 || num > 1_000_000)
    return "Number can be between 0 and 1,000,000";

  const [
    firstDigit,
    secondDigit,
    thirdDigit,
    fourthDigit,
    fifthDigit,
    sixthDigit,
  ] = getDigits(num);

  let transliteratedNumber = "";

  // starting from the biggest available digit:

  if (sixthDigit) {
    transliteratedNumber += `${getThaiNumberFromDigits(sixthDigit)}-${getThaiNumberFromDigits(100_000)} `;
  }

  if (fifthDigit) {
    transliteratedNumber += `${getThaiNumberFromDigits(fifthDigit)}-${getThaiNumberFromDigits(10_000)} `;
  }

  if (fourthDigit) {
    transliteratedNumber += `${getThaiNumberFromDigits(fourthDigit)}-${getThaiNumberFromDigits(1_000)} `;
  }

  if (thirdDigit) {
    transliteratedNumber += `${getThaiNumberFromDigits(thirdDigit)}-${getThaiNumberFromDigits(100)} `;
  }

  // one is a special case
  if (secondDigit) {
    transliteratedNumber += `${getThaiNumberFromDigits(+`${secondDigit}0`)} `;
  }

  const hasAnyOtherSignificantDigits = [
    secondDigit,
    thirdDigit,
    fourthDigit,
    fifthDigit,
    sixthDigit,
  ].some((digit) => !!digit);

  if (hasAnyOtherSignificantDigits && firstDigit === 1)
    transliteratedNumber += `eht`;
  else transliteratedNumber += `${getThaiNumberFromDigits(firstDigit)}`;

  return transliteratedNumber;
}

export default function Home() {
  const [output, setOutput] = useState<string | undefined>();

  return (
    <div className="w-[100dvw] h-[100dvh] flex flex-col justify-center items-center">
      <div className="w-[500px]">
        <h1 className="text-zinc-400 text-xl mb-4">
          Type your number (as 12345):
        </h1>

        <input
          onChange={(e) => {
            const value = e.target.value;

            setOutput(getThaiNumberTransliteration(+value));
          }}
          className="mb-4 w-full border px-3 py-2 bg-transparent rounded border-b-emerald-700 border-t-teal-500 border-x-green-500"
          max="1000000"
          min="0"
          type="number"
        />

        <div className="text-xl text-emerald-500 font-bold text-center">
          {output}
        </div>
      </div>

      <div className="text-center w-full mt-16 flex gap-1 items-center justify-center">
        <span>Made by</span>

        <Link
          href="https://github.com/aziznal/my-link-tree"
          target="_blank"
          className="flex gap-2 hover:text-rose-700 text-rose-500"
        >
          aziznal <LucideGithub />
        </Link>
      </div>
    </div>
  );
}
