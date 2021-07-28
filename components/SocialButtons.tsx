/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
export const SocialButtons = () => {
  return (
    <div className="flex pr-6 pl-6 bg-gray-200 justify-between items-center">
      <h1 className="text-xl font-thin text-indigo-600">Generate Fake Data</h1>
      <div className="h-12">
        <a
          className="inline-block h-4"
          href="https://github.com/SirwanAfifi/ts-faker"
        >
          <img
            src="https://img.shields.io/github/stars/SirwanAfifi/ts-faker?style=social"
            alt=""
          />
        </a>
        <a href="https://github.com/SirwanAfifi/ts-faker" target="_blank">
          <button className="h-10 ml-4">GitHub</button>
        </a>
      </div>
    </div>
  );
};
