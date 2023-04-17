function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export interface Tab {
  name: string
  href: string
  current: boolean
}

export default function DonationTypeSwitch({
  tabs,
  setActiveTab,
}: {
  tabs: Tab[]
  setActiveTab: any
}) {
  return (
    <div className="px-20 mb-10 mt-5 max-w-4xl mx-auto">
      <p className="text-base font-medium text-gray-900 mb-3">Type of donation</p>
      <nav className="grid grid-cols-2 border rounded-md bg-white" aria-label="Tabs">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            className={classNames(
              tab.current
                ? "bg-indigo-500 text-white"
                : "text-gray-500 hover:text-gray-700 underline",
              "first:rounded-l-md last:rounded-r-md py-3 md:py-5 text-lg font-medium text-center",
            )}
            aria-current={tab.current ? "page" : undefined}
            onClick={(e) => setActiveTab(tab.name)}
          >
            {tab.name}
          </a>
        ))}
      </nav>
    </div>
  )
}
