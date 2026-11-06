import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"
import {
  activities as initialActivities,
  conversations,
  sportNames,
  type Activity,
} from "./data"

type Page = "home" | "discover" | "detail" | "booking" | "success" | "my-activities" | "create" | "profile" | "favourites" | "messages" | "map" | "auth" | "onboarding" | "smart-match"

type IconName = "accessibility" | "arrow" | "bell" | "calendar" | "check" | "chevron" | "clock" | "close" | "edit" | "grid" | "heart" | "info" | "location" | "lock" | "map" | "menu" | "message" | "minus" | "more" | "plus" | "search" | "send" | "settings" | "sliders" | "spark" | "star" | "user" | "users"

const iconPaths: Record<IconName, ReactNode> = {
  accessibility: (
    <>
      <circle cx="12" cy="4" r="2" />
      <path d="M6 8h12M12 6v6l-3 8M12 12l4 8" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  close: <path d="M18 6 6 18M6 6l12 12" />,
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  location: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  map: (
    <>
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" />
      <path d="M9 3v15M15 6v15" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  message: (
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
  ),
  minus: <path d="M5 12h14" />,
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2.8 2.8-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1 1.6v.2h-4V21a1.8 1.8 0 0 0-1-1.6 1.8 1.8 0 0 0-2 .4l-.1.1-2.8-2.8.1-.1a1.8 1.8 0 0 0 .4-2A1.8 1.8 0 0 0 3 14H2.8v-4H3a1.8 1.8 0 0 0 1.6-1 1.8 1.8 0 0 0-.4-2l-.1-.1 2.8-2.8.1.1a1.8 1.8 0 0 0 2 .4A1.8 1.8 0 0 0 10 3v-.2h4V3a1.8 1.8 0 0 0 1 1.6 1.8 1.8 0 0 0 2-.4l.1-.1 2.8 2.8-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.6 1h.2v4H21a1.8 1.8 0 0 0-1.6 1Z" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
      <path d="M1 14h6M9 8h6M17 16h6" />
    </>
  ),
  spark: (
    <>
      <path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5Z" />
      <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z" />
    </>
  ),
  star: (
    <path d="m12 2 3 6 6.5.9-4.7 4.6 1.1 6.5-5.9-3-5.9 3 1.1-6.5-4.7-4.6L9 8Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22a8 8 0 0 1 16 0" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
}

type GameModel = {
  matchName: string
  setMatchName: (name: string) => void
  activities: Activity[]
  bookings: number[]
  signedIn: boolean
  setSignedIn: (value: boolean) => void
  update: (id: number, patch: Partial<Activity>) => void
  join: (id: number) => string | null
  leave: (id: number) => void
  add: (activity: Activity, booked?: boolean) => void
  editing: number | null
  setEditing: (id: number | null) => void
  search: string
  setSearch: (value: string) => void
}
const GameContext = createContext<GameModel>(null!)
const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
function StateNotice({ children }: { children: ReactNode }) {
  return (
    <div className="surface-card" role="status" style={{ marginBottom: 20 }}>
      {children}
    </div>
  )
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  )
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button className="logo" onClick={onClick} aria-label="sportTogether home">
      sport<span>Together</span>
    </button>
  )
}

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled,
  className = "",
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`button button-${variant} ${className}`}
    >
      {children}
    </button>
  )
}

function IconButton({
  label,
  icon,
  onClick,
  active = false,
}: {
  label: string
  icon: IconName
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`icon-button ${active ? "is-active" : ""}`}
      aria-label={label}
    >
      <Icon name={icon} size={19} />
    </button>
  )
}

function Avatar({
  initials,
  large = false,
}: {
  initials: string
  large?: boolean
}) {
  return (
    <span className={`avatar ${large ? "avatar-large" : ""}`}>{initials}</span>
  )
}

function Tag({
  children,
  peach = false,
}: {
  children: ReactNode
  peach?: boolean
}) {
  return <span className={`tag ${peach ? "tag-peach" : ""}`}>{children}</span>
}

function AccessibilityBadge({
  label = "Accessibility-friendly",
}: {
  label?: string
}) {
  return (
    <span className="accessibility-badge">
      <Icon name="accessibility" size={14} />
      {label}
    </span>
  )
}

function SportMark({ sport }: { sport: string }) {
  return <span className="sport-mark">{sport.slice(0, 2).toUpperCase()}</span>
}

function AppNavigation({
  page,
  navigate,
  mobileOpen,
  setMobileOpen,
}: {
  page: Page
  navigate: (page: Page) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}) {
  const nav = [
    ["Discover", "discover"],
    ["Smart Match", "smart-match"],
    ["My Activities", "my-activities"],
    ["Favourites", "favourites"],
    ["Messages", "messages"],
  ] as const

  return (
    <header className="app-nav">
      <div className="nav-inner">
        <Logo onClick={() => navigate("home")} />
        <nav className="desktop-links" aria-label="Primary navigation">
          {nav.map(([label, destination]) => (
            <button
              key={destination}
              className={page === destination ? "active" : ""}
              onClick={() => navigate(destination)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <IconButton
            label="Search activities"
            icon="search"
            onClick={() => navigate("discover")}
          />
          <span className="desktop-action">
            <IconButton label="Notifications" icon="bell" />
          </span>
          <button
            className="nav-avatar"
            aria-label="Open profile"
            onClick={() => navigate("profile")}
          >
            <Avatar initials="AK" />
          </button>
          <span className="desktop-action">
            <Button onClick={() => navigate("create")}>
              <Icon name="plus" size={17} />
              Create Activity
            </Button>
          </span>
          <span className="mobile-action">
            <IconButton
              label={mobileOpen ? "Close menu" : "Open menu"}
              icon={mobileOpen ? "close" : "menu"}
              onClick={() => setMobileOpen(!mobileOpen)}
            />
          </span>
        </div>
      </div>
      {mobileOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {nav.map(([label, destination]) => (
            <button
              key={destination}
              onClick={() => {
                navigate(destination)
                setMobileOpen(false)
              }}
            >
              {label}
              <Icon name="chevron" />
            </button>
          ))}
          <Button
            onClick={() => {
              navigate("create")
              setMobileOpen(false)
            }}
          >
            <Icon name="plus" size={17} />
            Create Activity
          </Button>
        </nav>
      )}
    </header>
  )
}

function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

function ActivityCard({
  activity,
  saved,
  onSave,
  onOpen,
}: {
  activity: Activity
  saved: boolean
  onSave: () => void
  onOpen: () => void
}) {
  return (
    <article className="activity-card">
      <div className="activity-image">
        <img src={activity.image} alt={`${activity.sport} activity`} />
        <Tag>{"Game"}</Tag>
        <IconButton
          label={saved ? "Remove from favourites" : "Save to favourites"}
          icon="heart"
          active={saved}
          onClick={onSave}
        />
      </div>
      <div className="activity-body">
        <div className="activity-kicker">
          <span>{activity.sport}</span>
          <span>{activity.level}</span>
        </div>
        <h3>{activity.title}</h3>
        <div className="activity-meta">
          <p>
            <Icon name="calendar" size={16} />
            {activity.date} · {activity.time}
          </p>
          <p>
            <Icon name="location" size={16} />
            {activity.location}
          </p>
        </div>
        <div className="activity-footer">
          <div>
            <strong>{activity.spots}</strong>
            <span>
              {activity.status === "cancelled"
                ? " cancelled"
                : activity.spots === 0
                  ? " · Game full"
                  : " spots available"}
            </span>
          </div>
          <IconButton
            label={`View ${activity.title}`}
            icon="arrow"
            onClick={onOpen}
          />
        </div>
      </div>
    </article>
  )
}

function SearchBar({
  query,
  setQuery,
  onSearch,
}: {
  query: string
  setQuery: (value: string) => void
  onSearch: () => void
}) {
  return (
    <div className="hero-search">
      <label className="search-field">
        <Icon name="search" />
        <span>
          <small>What are you looking for?</small>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for sports, location or activity..."
          />
        </span>
      </label>
      <label className="search-field location-field">
        <Icon name="location" />
        <span>
          <small>Location</small>
          <select defaultValue="Vienna">
            <option>Erdberg</option>
            <option>Donaustadt</option>
            <option>Prater</option>
          </select>
        </span>
      </label>
      <Button onClick={onSearch} aria-label="Search">
        <span className="button-label">Search</span>
        <Icon name="arrow" />
      </Button>
    </div>
  )
}

function HomePage({
  navigate,
  favourites,
  toggleFavourite,
  setSelected,
}: SharedPageProps) {
  const { activities } = useContext(GameContext)

  const model = useContext(GameContext)
  const [selectedSport, setSelectedSport] = useState("Tennis")
  const [query, setQuery] = useState("")
  return (
    <>
      <section className="hero">
        <img
          className="hero-architecture"
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1593&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
          alt=""
        />
        <div className="hero-wash" />
        <div className="container hero-content">
          <h1>
            Different sports,
            <br />
            same <em>goal.</em>
          </h1>
          <p className="hero-copy">
            sportTogether connects people who love to move. Discover activities,
            find players, join games and build a more active, social lifestyle.
          </p>
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={() => {
              model.setSearch(query)
              navigate("discover")
            }}
          />
        </div>
      </section>

      <section className="container category-section">
        <div className="category-row">
          {sportNames.map((sport) => (
            <button
              key={sport}
              className={`category-card ${
                selectedSport === sport ? "selected" : ""
              }`}
              onClick={() => setSelectedSport(sport)}
            >
              <span>{sport}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container smart-match-entry">
        <div className="match-entry-visual" aria-hidden="true">
          <span className="match-orbit match-orbit-one" />
          <span className="match-orbit match-orbit-two" />
          <div className="match-avatar match-avatar-one">MK</div>
          <div className="match-avatar match-avatar-two">JL</div>
          <div className="match-connection" />
        </div>
        <div className="match-entry-copy">
          <p className="eyebrow">Find Your Match</p>
          <h2>
            No team? <em>No problem.</em>
          </h2>
          <p>
            Discover players who match your skill level, availability, and
            location.
          </p>
          <Button onClick={() => navigate("smart-match")}>
            Find My Match
            <Icon name="arrow" size={17} />
          </Button>
        </div>
      </section>

      <section className="container section-space">
        <PageHeader
          eyebrow="Curated for you"
          title="Popular near you"
          subtitle="Thoughtful ways to move, connect and spend time together in Vienna."
          action={
            <Button variant="outline" onClick={() => navigate("discover")}>
              Explore all
              <Icon name="arrow" size={17} />
            </Button>
          }
        />
        <div className="activity-grid home-grid">
          {[
            ...activities
              .filter((activity) => activity.organiser === "Smart Match")
              .slice(-1),
            ...activities.filter(
              (activity) => activity.organiser !== "Smart Match",
            ),
          ]
            .slice(0, 5)
            .map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                saved={favourites.includes(activity.id)}
                onSave={() => toggleFavourite(activity.id)}
                onOpen={() => {
                  setSelected(activity)
                  navigate("detail")
                }}
              />
            ))}
        </div>
      </section>

      <section className="container editorial-band">
        <div>
          <p className="eyebrow">A more social way to move</p>
          <h2>
            Less planning.
            <br />
            <em>More playing.</em>
          </h2>
        </div>
      </section>
    </>
  )
}

type SharedPageProps = {
  navigate: (page: Page) => void
  favourites: number[]
  toggleFavourite: (id: number) => void
  selected: Activity
  setSelected: (activity: Activity) => void
  notify: (message: string) => void
}

function DiscoverPage({
  navigate,
  favourites,
  toggleFavourite,
  setSelected,
  notify,
}: SharedPageProps) {
  const { activities } = useContext(GameContext)

  const [sport, setSport] = useState("All sports")
  const [type, setType] = useState("All types")
  const [accessibility, setAccessibility] = useState("All activities")
  const model = useContext(GameContext)
  const [query, setQuery] = useState(model.search)
  const [location, setLocation] = useState("Vienna")
  const [date, setDate] = useState("Any date")
  const [level, setLevel] = useState("Any level")
  const [distance, setDistance] = useState("Within 5 km")
  const [view, setView] = useState<"grid" | "map">("grid")
  const visible = useMemo(
    () =>
      activities.filter(
        (activity) =>
          activity.status !== "cancelled" &&
          (location === "Vienna" || activity.district === location) &&
          (level === "Any level" ||
            activity.level === "All Levels" ||
            activity.level === level) &&
          parseFloat(activity.distance) <=
            parseFloat(distance.replace("Within ", "")) &&
          (date === "Any date" ||
            (date === "Today"
              ? activity.dateISO === "2026-10-24"
              : activity.dateISO === "2026-10-24" ||
                activity.dateISO === "2026-10-25")) &&
          (sport === "All sports" || activity.sport === sport) &&
          `${activity.title} ${activity.location}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [
      activities,
      sport,
      type,
      accessibility,
      query,
      location,
      date,
      level,
      distance,
    ],
  )

  if (view === "map")
    return (
      <MapPage
        navigate={navigate}
        favourites={favourites}
        toggleFavourite={toggleFavourite}
        selected={activities[0]}
        setSelected={setSelected}
        notify={notify}
        filtered={visible}
        embedded
        onGrid={() => setView("grid")}
      />
    )

  return (
    <div className="container page-space">
      <PageHeader
        title="Discover"
        subtitle="Explore games, activities and players near you."
      />
      <div className="filter-panel">
        <label className="wide-filter">
          <span>Search</span>
          <div>
            <Icon name="search" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search activities or locations"
            />
          </div>
        </label>
        <label>
          <span>Location</span>
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          >
            {[
              "Vienna",
              "Leopoldstadt",
              "Donaustadt",
              "Landstraße",
              "Innere Stadt",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Date</span>
          <select
            value={date}
            onChange={(event) => setDate(event.target.value)}
          >
            {["Any date", "Today", "This weekend"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Sport</span>
          <select
            value={sport}
            onChange={(event) => setSport(event.target.value)}
          >
            <option>All sports</option>
            {sportNames.slice(0, -1).map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Skill level</span>
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
          >
            {["Any level", "Beginner", "Intermediate", "Pro"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Distance</span>
          <select
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
          >
            {["Within 2 km", "Within 5 km", "Within 10 km"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="discover-toolbar">
        <div className="view-toggle">
          <button className="selected">
            <Icon name="grid" size={17} />
            Grid
          </button>
          <button onClick={() => setView("map")}>
            <Icon name="map" size={17} />
            Map
          </button>
        </div>
      </div>
      <p className="result-count">{visible.length} activities found</p>
      {visible.length > 0 ? (
        <div className="activity-grid">
          {visible.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              saved={favourites.includes(activity.id)}
              onSave={() => toggleFavourite(activity.id)}
              onOpen={() => {
                setSelected(activity)
                navigate("detail")
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No activities found"
          copy="Try changing a filter or create the activity you want to see."
          action="Create Activity"
          onAction={() => navigate("create")}
        />
      )}
    </div>
  )
}

function FilterSelect({
  label,
  value,
  options,
}: {
  label: string
  value: string
  options: string[]
}) {
  return (
    <label>
      <span>{label}</span>
      <select defaultValue={value}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

function DetailPage({
  selected,
  navigate,
  favourites,
  toggleFavourite,
}: SharedPageProps) {
  const model = useContext(GameContext)
  const joined = model.bookings.includes(selected.id)
  const [confirmCancel, setConfirmCancel] = useState(false)
  return (
    <div className="container page-space">
      <button className="back-link" onClick={() => navigate("discover")}>
        <Icon name="arrow" size={17} />
        Back to Discover
      </button>
      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-photo">
            <img src={selected.image} alt={`${selected.title} activity`} />
            <Tag>{selected.type}</Tag>
            <IconButton
              label="Save activity"
              icon="heart"
              active={favourites.includes(selected.id)}
              onClick={() => toggleFavourite(selected.id)}
            />
          </div>
          <div className="detail-copy">
            <p className="eyebrow">About this activity</p>
            <h2>A good game starts with the right people.</h2>
            <p>{selected.description}</p>
            <div className="tag-list">
              <Tag>{selected.level}</Tag>
              <Tag>Social</Tag>
              <Tag>Outdoor</Tag>
              <Tag>Equipment available</Tag>
            </div>
          </div>
          <div className="organiser-card">
            <Avatar
              initials={selected.organiser
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
              large
            />
            <div>
              <small>Organised by</small>
              <h3>{selected.organiser}</h3>
              <p>{selected.organiserRole}</p>
            </div>
            <Button variant="outline" onClick={() => navigate("messages")}>
              Message
            </Button>
          </div>
          <div className="participants-block">
            <div>
              <p className="eyebrow">The group</p>
              <h2>
                {selected.capacity - selected.spots} people are already in
              </h2>
            </div>
            <div className="avatar-stack">
              {["MA", "EW", "JP", "NK"]
                .slice(0, selected.capacity - selected.spots)
                .map((person) => (
                  <Avatar key={person} initials={person} />
                ))}
              <span>
                +{Math.max(0, selected.capacity - selected.spots - 4)}
              </span>
            </div>
          </div>
        </div>
        <aside className="booking-panel">
          <Tag>{selected.type}</Tag>
          <p className="booking-sport">{selected.sport}</p>
          <h1>{selected.title}</h1>
          <div className="booking-facts">
            <Fact icon="calendar" label="Date" value={selected.date} />
            <Fact icon="clock" label="Time" value={selected.time} />
            <Fact
              icon="location"
              label="Location"
              value={`${selected.location}, ${selected.district}`}
            />
            <Fact icon="star" label="Skill level" value={selected.level} />
            <Fact
              icon="users"
              label="Availability"
              value={`${selected.spots} of ${selected.capacity} spots left`}
            />
          </div>
          <div className="mini-map">
            <span className="map-road road-a" />
            <span className="map-road road-b" />
            <span className="map-marker">
              <Icon name="location" size={17} />
            </span>
            <small>{selected.distance} away</small>
          </div>
          {selected.status === "cancelled" ? (
            <StateNotice>This game has been cancelled.</StateNotice>
          ) : selected.owned ? (
            <>
              <StateNotice>
                You organise this game and have a place in it.
              </StateNotice>
              <Button
                className="full-button"
                onClick={() => {
                  model.setEditing(selected.id)
                  navigate("create")
                }}
              >
                Edit Game
              </Button>
              <Button
                variant="outline"
                className="full-button"
                onClick={() => setConfirmCancel(true)}
              >
                Cancel Game
              </Button>
              <h3>Participants</h3>
              <p>
                {selected.capacity - selected.spots} / {selected.capacity}{" "}
                places filled, including you.
              </p>
              <p>
                Participant names and attendance will come from the live
                service. No automatic no-show penalties are applied in this
                demo.
              </p>
            </>
          ) : joined ? (
            <>
              <StateNotice>Your place is confirmed.</StateNotice>
              <Button
                className="full-button"
                variant="outline"
                onClick={() => setConfirmCancel(true)}
              >
                Cancel My Place
              </Button>
            </>
          ) : (
            <Button
              className="full-button"
              disabled={selected.spots < 1}
              onClick={() => navigate("booking")}
            >
              {selected.spots < 1 ? "Game Full" : "Join Game"}
              <Icon name="arrow" size={18} />
            </Button>
          )}
          {confirmCancel && (
            <div
              className="surface-card"
              role="alertdialog"
              aria-label="Confirm cancellation"
            >
              <h3>
                {selected.owned
                  ? "Cancel this game for everyone?"
                  : "Cancel your place?"}
              </h3>
              <p>
                {selected.owned
                  ? "Participants will see the cancelled status."
                  : "Your place will become available to other players."}
              </p>
              <Button
                onClick={() => {
                  if (selected.owned)
                    model.update(selected.id, { status: "cancelled" })
                  else model.leave(selected.id)
                  setConfirmCancel(false)
                }}
              >
                Confirm Cancellation
              </Button>
              <Button variant="ghost" onClick={() => setConfirmCancel(false)}>
                Keep {selected.owned ? "Game" : "Place"}
              </Button>
            </div>
          )}
          <p className="panel-note">
            Direct booking. No organiser approval or payment required.
          </p>
        </aside>
      </div>
    </div>
  )
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: IconName
  label: string
  value: string
}) {
  return (
    <div className="fact">
      <Icon name={icon} />
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </div>
  )
}

function BookingPage({ selected, navigate }: SharedPageProps) {
  const model = useContext(GameContext)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState("")
  const [taken, setTaken] = useState(false)
  const blocked =
    taken ||
    selected.spots < 1 ||
    selected.status === "cancelled" ||
    model.bookings.includes(selected.id)
  return (
    <div className="narrow-container page-space">
      <PageHeader
        eyebrow="One final step"
        title="Confirm your place"
        subtitle="Your place is reserved only after confirmation."
      />
      <div className="booking-overview">
        <img src={selected.image} alt="" />
        <div>
          <Tag>{selected.type}</Tag>
          <h2>{selected.title}</h2>
          <p>
            {selected.sport} · {selected.level}
          </p>
        </div>
      </div>
      <div className="confirmation-card">
        <div className="confirmation-grid">
          <Fact icon="calendar" label="Date" value={selected.date} />
          <Fact icon="clock" label="Time" value={selected.time} />
          <Fact icon="location" label="Location" value={selected.location} />
          <Fact icon="user" label="Organiser" value={selected.organiser} />
        </div>
        {error && (
          <div role="alert" className="surface-card">
            {error}
          </div>
        )}
        {blocked && (
          <StateNotice>
            {selected.status === "cancelled"
              ? "This game has been cancelled."
              : model.bookings.includes(selected.id)
                ? "You already have a confirmed place."
                : "There are no places available. Try another game."}
          </StateNotice>
        )}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            I understand the game level and will cancel if I cannot attend.
          </span>
        </label>
        <div className="confirmation-actions">
          <Button variant="ghost" onClick={() => navigate("detail")}>
            Back
          </Button>
          <Button
            disabled={!agreed || blocked}
            onClick={() => {
              const result = model.join(selected.id)
              if (result) setError(result)
              else navigate("success")
            }}
          >
            Confirm Booking
          </Button>
        </div>
        <details style={{ marginTop: 24 }}>
          <summary>Preview booking conflict</summary>
          <p>
            Demo scenario: another player takes the last place before
            confirmation.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setTaken(true)
              setError(
                "The last place has just been taken. Your booking was not confirmed.",
              )
            }}
          >
            Simulate Last Place Taken
          </Button>
        </details>
      </div>
    </div>
  )
}

function SuccessPage({ selected, navigate }: SharedPageProps) {
  return (
    <div className="success-page">
      <div className="success-mark">
        <Icon name="check" size={32} />
      </div>
      <p className="eyebrow">Booking confirmed</p>
      <h1>
        You’re in. See you
        <br />
        <em>on the court!</em>
      </h1>
      <p>
        Your place is confirmed in this demo and the game appears in My
        Activities.
      </p>
      <div className="success-summary">
        <SportMark sport={selected.sport} />
        <div>
          <strong>{selected.title}</strong>
          <span>
            {selected.date} · {selected.time}
          </span>
          <span>{selected.location}</span>
        </div>
      </div>
      <div className="success-actions">
        <Button variant="outline">
          <Icon name="calendar" size={17} />
          Add to Calendar
        </Button>
        <Button onClick={() => navigate("my-activities")}>
          View My Activities
          <Icon name="arrow" size={17} />
        </Button>
      </div>
    </div>
  )
}

function MyActivitiesPage({ navigate, setSelected }: SharedPageProps) {
  const model = useContext(GameContext)
  const [tab, setTab] = useState("Upcoming")
  const items = model.activities
    .filter((a) =>
      tab === "Organising"
        ? a.owned
        : tab === "Past"
          ? model.bookings.includes(a.id) && (a.dateISO || "") < "2026-10-24"
          : model.bookings.includes(a.id) && (a.dateISO || "") >= "2026-10-24",
    )
    .sort((a, b) => (a.dateISO || "").localeCompare(b.dateISO || ""))
  return (
    <div className="container page-space">
      <PageHeader
        eyebrow="Your sporting life"
        title="My Activities"
        subtitle="Your confirmed places and the games you organise."
        action={
          <Button
            onClick={() => {
              model.setEditing(null)
              navigate("create")
            }}
          >
            Create Activity
          </Button>
        }
      />
      <Tabs
        items={["Upcoming", "Organising", "Past"]}
        selected={tab}
        setSelected={setTab}
      />
      <div className="horizontal-list">
        {items.map((a) => (
          <article className="horizontal-card" key={a.id}>
            <img src={a.image} alt="" />
            <div className="horizontal-main">
              <Tag>
                {a.status === "cancelled"
                  ? "Cancelled"
                  : tab === "Past"
                    ? "Completed"
                    : a.owned
                      ? "Organising"
                      : "Confirmed"}
              </Tag>
              <h2>{a.title}</h2>
              <p>
                {a.sport} · {a.level}
              </p>
              <div className="horizontal-facts">
                <span>
                  {a.date} · {a.time}
                </span>
                <span>{a.location}</span>
                <span>
                  {a.capacity - a.spots} / {a.capacity} participants
                </span>
              </div>
            </div>
            <div className="card-actions">
              <Button
                variant="outline"
                onClick={() => {
                  setSelected(a)
                  navigate("detail")
                }}
              >
                {a.owned ? "Manage Game" : "View Details"}
              </Button>
              {!a.owned && a.status !== "cancelled" && tab !== "Past" && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelected(a)
                    navigate("detail")
                  }}
                >
                  Cancel My Place
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>
      {items.length === 0 && (
        <EmptyState
          title={tab === "Past" ? "No past games yet" : "No games here yet"}
          copy="Find a game to join or organise one yourself."
          action="Discover Games"
          onAction={() => navigate("discover")}
        />
      )}
    </div>
  )
}

function Tabs({
  items,
  selected,
  setSelected,
}: {
  items: string[]
  selected: string
  setSelected: (item: string) => void
}) {
  return (
    <div className="tabs">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => setSelected(item)}
          className={selected === item ? "selected" : ""}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

function CreatePage({ navigate, setSelected }: SharedPageProps) {
  const model = useContext(GameContext),
    existing = model.activities.find((a) => a.id === model.editing)
  const [title, setTitle] = useState(existing?.title || ""),
    [sport, setSport] = useState(existing?.sport || "Tennis"),
    [type, setType] = useState(existing?.type || "Game"),
    [date, setDate] = useState(existing?.dateISO || "2026-10-31"),
    [start, setStart] = useState(existing?.time.split("–")[0] || "10:00"),
    [end, setEnd] = useState(existing?.time.split("–")[1] || "11:30"),
    [location, setLocation] = useState(existing?.location || ""),
    [capacity, setCapacity] = useState(String(existing?.capacity || 4)),
    [level, setLevel] = useState(existing?.level || "All Levels"),
    [description, setDescription] = useState(existing?.description || ""),
    [error, setError] = useState("")
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const occupied = existing ? existing.capacity - existing.spots : 1
    if (
      !title.trim() ||
      !location.trim() ||
      date < "2026-10-24" ||
      end <= start ||
      Number(capacity) < occupied ||
      Number(capacity) < 2
    ) {
      setError(
        "Enter a title and venue, a future date, an end time after the start and enough places for everyone.",
      )
      return
    }
    const game: Activity = {
      ...(initialActivities.find((a) => a.sport === sport) ||
        initialActivities[0]),
      id: existing?.id || Date.now(),
      owned: true,
      status: "open",
      organiser: "Alex König",
      organiserRole: "Organiser",
      title: title.trim(),
      type: type as Activity["type"],
      sport,
      dateISO: date,
      date: formatDate(date),
      time: start + "–" + end,
      location: location.trim(),
      district: existing?.district || "Vienna",
      capacity: Number(capacity),
      spots: Number(capacity) - occupied,
      level,
      description: description || "A friendly player-organised game.",
      instant: true,
    }
    if (existing) model.update(existing.id, game)
    else model.add(game)
    setSelected(game)
    model.setEditing(null)
    navigate("detail")
  }
  return (
    <div className="container page-space">
      <PageHeader
        title={existing ? "Edit Game" : "Create Activity"}
        subtitle="Everyone can organise and participate. Your place is included in the capacity."
      />
      <div className="create-layout">
        <form className="form-card" onSubmit={submit}>
          {error && <p role="alert">{error}</p>}
          <fieldset>
            <legend>Activity type</legend>
            <div className="segmented">
              {["Game", "Players Wanted"].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={type === item ? "selected" : ""}
                  onClick={() => setType(item as Activity["type"])}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="form-grid">
            <label>
              Sport
              <select value={sport} onChange={(e) => setSport(e.target.value)}>
                {sportNames.slice(0, -1).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <FormField
              label="Activity title"
              value={title}
              onChange={setTitle}
            />
            <label className="span-two">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </label>
            <FormField
              label="Location"
              value={location}
              onChange={setLocation}
            />
            <FormField
              label="Date"
              type="date"
              value={date}
              onChange={setDate}
            />
            <FormField
              label="Start time"
              type="time"
              value={start}
              onChange={setStart}
            />
            <FormField
              label="End time"
              type="time"
              value={end}
              onChange={setEnd}
            />
            <FormField
              label="Maximum participants"
              type="number"
              value={capacity}
              onChange={setCapacity}
            />
            <label>
              Skill requirement
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                {["All Levels", "Beginner", "Intermediate", "Pro"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
              <small>
                All Levels means casual play without a skill restriction.
              </small>
            </label>
          </div>
          <div className="form-actions">
            <Button
              variant="ghost"
              onClick={() => {
                model.setEditing(null)
                navigate("my-activities")
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {existing ? "Save Changes" : "Create Activity"}
            </Button>
          </div>
        </form>
        <aside className="creation-preview">
          <div className="architectural-preview">
            <span />
            <span />
          </div>
          <p className="eyebrow">Live preview</p>
          <Tag>{type}</Tag>
          <h2>{title || "Your next game"}</h2>
          <p>
            {sport} · {level}
          </p>
          <p>
            {formatDate(date)} · {start}–{end}
          </p>
          <p>{location || "Choose a venue"}</p>
          <div className="preview-line" />
          <div className="preview-row">
            <Avatar initials="AK" />
            <span>Organised by you · your place is included</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

function FormField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (value: string) => void
}) {
  return (
    <label>
      {label}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={
          onChange ? (event) => onChange(event.target.value) : undefined
        }
      />
    </label>
  )
}

function FormSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label>
      {label}
      <select>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

function ProfilePage() {
  const { activities } = useContext(GameContext)

  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(
    "Weekend tennis player and enthusiastic beginner climber. Always happy to meet people through sport.",
  )
  const [skills, setSkills] = useState<Record<string, string>>({
    Tennis: "Intermediate",
    Running: "Beginner",
    Climbing: "Beginner",
  })
  return (
    <div className="container page-space">
      <div className="profile-hero">
        <div className="profile-identity">
          <Avatar initials="AK" large />
          <div>
            <p className="eyebrow">Player profile</p>
            <h1>Alex König</h1>
            <p>
              <Icon name="location" size={16} />
              Vienna, Austria · 27 years
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setEditing(!editing)}>
          <Icon name="edit" size={16} />
          {editing ? "Save Profile" : "Edit Profile"}
        </Button>
        <p className="profile-bio">
          {editing ? (
            <textarea
              aria-label="Biography"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            bio
          )}
        </p>
        <div className="tag-list">
          <Tag>Tennis</Tag>
          <Tag>Running</Tag>
          <Tag>Climbing</Tag>
        </div>
      </div>
      <section className="surface-card" style={{ margin: "24px 0" }}>
        <p className="eyebrow">Self-assessed per sport</p>
        <h2>Your skill levels</h2>
        <p>
          Beginner: learning the basics. Intermediate: comfortable in games.
          Pro: experienced competitive play.
        </p>
        <div className="form-grid">
          {Object.entries(skills).map(([sport, level]) => (
            <label key={sport}>
              {sport}
              <select
                disabled={!editing}
                value={level}
                onChange={(e) =>
                  setSkills({ ...skills, [sport]: e.target.value })
                }
              >
                {["Beginner", "Intermediate", "Pro"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </section>
      <StateNotice>
        Attendance and reliability rules are still being agreed. No numerical
        reliability score or peer rating is shown.
      </StateNotice>
      <div className="profile-content-grid">
        <section className="surface-card">
          <p className="eyebrow">Your games</p>
          <h2>Upcoming activities</h2>
          {activities.slice(0, 3).map((activity) => (
            <div className="history-row" key={activity.id}>
              <SportMark sport={activity.sport} />
              <span>
                <strong>{activity.title}</strong>
                <small>
                  {activity.date} · {activity.location}
                </small>
              </span>
              <Icon name="check" size={18} />
            </div>
          ))}
        </section>
        <section className="surface-card">
          <p className="eyebrow">Your places</p>
          <h2>Favourite locations</h2>
          {["Prater Park", "Donauinsel", "Tennis Point Vienna"].map(
            (place, index) => (
              <div className="location-row" key={place}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{place}</strong>
                <Icon name="chevron" size={17} />
              </div>
            ),
          )}
          <Button variant="ghost">
            <Icon name="settings" size={17} />
            Profile Settings
          </Button>
        </section>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  suffix,
  note,
  circular,
}: {
  label: string
  value: string
  suffix?: string
  note: string
  circular?: boolean
}) {
  return (
    <article className="stat-card">
      {circular && <div className="progress-ring" />}
      <p>{label}</p>
      <strong>
        {value} <small>{suffix}</small>
      </strong>
      <span>{note}</span>
    </article>
  )
}

function FavouritesPage({
  favourites,
  toggleFavourite,
  navigate,
  setSelected,
}: SharedPageProps) {
  const { activities } = useContext(GameContext)

  const [tab, setTab] = useState("Activities")
  const favouriteActivities = activities.filter((activity) =>
    favourites.includes(activity.id),
  )
  return (
    <div className="container page-space">
      <PageHeader
        title="Favourites"
        subtitle="A thoughtful collection of activities, people and places you want to return to."
      />
      <Tabs
        items={["Activities", "Locations", "Groups"]}
        selected={tab}
        setSelected={setTab}
      />
      {tab === "Activities" && favouriteActivities.length > 0 ? (
        <div className="activity-grid">
          {favouriteActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              saved
              onSave={() => toggleFavourite(activity.id)}
              onOpen={() => {
                setSelected(activity)
                navigate("detail")
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={
            tab === "Activities"
              ? "Your collection is waiting"
              : `No saved ${tab.toLowerCase()} yet`
          }
          copy="Save inspiring activities and trusted people to find them again here."
          action="Explore Activities"
          onAction={() => navigate("discover")}
        />
      )}
    </div>
  )
}

function EmptyState({
  title,
  copy,
  action,
  onAction,
}: {
  title: string
  copy: string
  action: string
  onAction: () => void
}) {
  return (
    <div className="empty-state">
      <span className="empty-orbit" />
      <div className="empty-icon">
        <Icon name="heart" size={27} />
      </div>
      <h2>{title}</h2>
      <p>{copy}</p>
      <Button onClick={onAction}>
        {action}
        <Icon name="arrow" size={17} />
      </Button>
    </div>
  )
}

function MessagesPage({ matchConnected }: { matchConnected: boolean }) {
  const model = useContext(GameContext)
  const [active, setActive] = useState(matchConnected ? 4 : 1)
  const [draft, setDraft] = useState("")
  const [sent, setSent] = useState<string[]>([])
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const messageConversations = matchConnected
    ? [
        ...conversations,
        {
          id: 4,
          name: model.matchName + " · Smart Match",
          initials: "MK",
          preview: "You’re connected. Plan your first game together.",
          time: "Now",
          unread: 1,
        },
      ]
    : conversations
  const conversation =
    messageConversations.find((item) => item.id === active) ||
    messageConversations[0]
  const send = (event: FormEvent) => {
    event.preventDefault()
    if (draft.trim()) {
      setSent([...sent, draft.trim()])
      setDraft("")
    }
  }
  return (
    <div className="container page-space messages-page">
      <PageHeader
        title="Messages"
        subtitle="Keep plans simple and the conversation moving."
      />
      <div className="messaging-shell">
        <aside className="conversation-sidebar">
          <label className="conversation-search">
            <Icon name="search" size={17} />
            <input placeholder="Search conversations" />
          </label>
          {messageConversations.map((item) => (
            <button
              key={item.id}
              className={active === item.id ? "active" : ""}
              onClick={() => setActive(item.id)}
            >
              <Avatar initials={item.initials} />
              <span>
                <strong>{item.name}</strong>
                <small>{item.preview}</small>
              </span>
              <time>{item.time}</time>
              {item.unread > 0 && <i>{item.unread}</i>}
            </button>
          ))}
        </aside>
        <section className="chat-panel">
          <header>
            <Avatar initials={conversation.initials} />
            <div>
              <strong>{conversation.name}</strong>
              <small>Active now</small>
            </div>
            <IconButton icon="more" label="Conversation options" />
          </header>
          <div className="chat-history">
            <div className="privacy-indicator">
              <Icon name="lock" size={15} />
              <span>
                Your privacy matters. We protect your conversations and personal
                information.
              </span>
              <button
                type="button"
                aria-label="Learn about intended message security"
                aria-expanded={privacyOpen}
                onClick={() => setPrivacyOpen(!privacyOpen)}
              >
                <Icon name="info" size={15} />
              </button>
              {privacyOpen && (
                <div className="privacy-tooltip" role="tooltip">
                  <strong>Intended security measures</strong>
                  <p>
                    These safeguards are product requirements and are not
                    represented as implemented in this prototype.
                  </p>
                  <ul>
                    <li>Encrypted communication</li>
                    <li>Secure message storage</li>
                    <li>Access restricted to authorized participants</li>
                    <li>User-controlled chat deletion</li>
                  </ul>
                </div>
              )}
            </div>
            <p className="chat-day">Today</p>
            <div className="bubble incoming">
              Hi Alex, looking forward to the game this weekend.
            </div>
            <div className="bubble outgoing">
              Me too. Is there anything specific I should bring?
            </div>
            <div className="bubble incoming">
              Just your shoes and water. I can bring the rest.
            </div>
            {sent.map((message, index) => (
              <div className="bubble outgoing" key={`${message}-${index}`}>
                {message}
              </div>
            ))}
          </div>
          <form className="message-form" onSubmit={send}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Write a message..."
              aria-label="Message"
            />
            <Button type="submit" disabled={!draft.trim()}>
              <Icon name="send" size={17} />
              <span className="button-label">Send</span>
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}

const demoMatchPeople = [
  {
    id: 1,
    name: "Maya Keller",
    initials: "MK",
    sports: ["Tennis", "Padel", "Volleyball"],
    level: "Intermediate",
    km: 1.8,
    days: ["Sat", "Sun"],
    from: "09:00",
    until: "13:00",
    style: "Casual",
    bio: "Weekend games, good rallies and a coffee afterwards.",
    tone: "mint",
  },
  {
    id: 2,
    name: "Jonas Leitner",
    initials: "JL",
    sports: ["Tennis", "Basketball", "Football"],
    level: "Intermediate",
    km: 3.2,
    days: ["Sat", "Wed"],
    from: "10:00",
    until: "20:00",
    style: "Casual",
    bio: "Always up for a friendly game and meeting new people.",
    tone: "sand",
  },
  {
    id: 3,
    name: "Leonie Wolf",
    initials: "LW",
    sports: ["Tennis", "Padel", "Running"],
    level: "Pro",
    km: 4.5,
    days: ["Sun", "Thu"],
    from: "10:30",
    until: "19:00",
    style: "Competitive",
    bio: "Love a good challenge. Happy to play with different levels.",
    tone: "peach",
  },
  {
    id: 4,
    name: "Noah Berger",
    initials: "NB",
    sports: ["Volleyball", "Basketball", "Climbing", "Yoga"],
    level: "Beginner",
    km: 2.5,
    days: ["Sat", "Sun"],
    from: "09:00",
    until: "18:00",
    style: "Casual",
    bio: "Here to move more and find a regular sports buddy.",
    tone: "mint",
  },
  {
    id: 5,
    name: "Sara Novak",
    initials: "SN",
    sports: ["Running", "Football", "Yoga", "Climbing"],
    level: "Intermediate",
    km: 1.5,
    days: ["Tue", "Thu", "Sun"],
    from: "10:00",
    until: "20:00",
    style: "Casual",
    bio: "An easygoing game is my favourite way to unwind.",
    tone: "peach",
  },
]
function SmartMatchPage({
  navigate,
  notify,
  matchConnected,
  setMatchConnected,
}: {
  navigate: (page: Page) => void
  notify: (message: string) => void
  matchConnected: boolean
  setMatchConnected: (value: boolean) => void
}) {
  const model = useContext(GameContext)
  type MatchPrefs = {
    sports: string[]
    levels: Record<string, string>
    windows: Record<string, { from: string; until: string }>
    km: string
    groupSize: string
    style: string
  }
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const levelRank: Record<string, number> = {
    Beginner: 0,
    Intermediate: 1,
    Pro: 2,
  }
  const initial: MatchPrefs = {
    sports: ["Volleyball"],
    levels: { Volleyball: "Intermediate" },
    windows: {
      Sat: { from: "10:00", until: "12:00" },
      Sun: { from: "10:00", until: "12:00" },
    },
    km: "5",
    groupSize: "6",
    style: "Any style",
  }
  const [prefs, setPrefs] = useState<MatchPrefs>(initial)
  const [applied, setApplied] = useState<MatchPrefs>(initial)
  const [editing, setEditing] = useState(true)
  const [round, setRound] = useState(0)
  const [failedIds, setFailedIds] = useState<number[]>([])
  const [responses, setResponses] =
    useState<Record<number, "accepted" | "pending">>({})
  const [error, setError] = useState("")
  const [selfAccepted, setSelfAccepted] = useState(false)

  const timeValue = (value: string) =>
    Number(value.slice(0, 2)) * 60 + Number(value.slice(3, 5))
  const skillGap = (person: typeof demoMatchPeople[number]) =>
    Math.min(
      ...applied.sports
        .filter((sport) => person.sports.includes(sport))
        .map((sport) =>
          Math.abs(
            (levelRank[person.level] ?? 1) -
              (levelRank[applied.levels[sport]] ?? 1),
          ),
        ),
    )
  const sharedWindow = (person: typeof demoMatchPeople[number]) =>
    Math.max(
      0,
      ...Object.entries(applied.windows)
        .filter(([day]) => person.days.includes(day))
        .map(
          ([, window]) =>
            Math.min(timeValue(person.until), timeValue(window.until)) -
            Math.max(timeValue(person.from), timeValue(window.from)),
        ),
    )
  const compatible = demoMatchPeople
    .filter((person) => {
      const sharedSports = applied.sports.filter((sport) =>
        person.sports.includes(sport),
      )
      const hasTimeOverlap = Object.entries(applied.windows).some(
        ([day, window]) =>
          person.days.includes(day) &&
          person.from < window.until &&
          person.until > window.from,
      )
      const hasSkillMatch = sharedSports.some((sport) => {
        const difference = Math.abs(
          (levelRank[person.level] ?? 1) -
            (levelRank[applied.levels[sport]] ?? 1),
        )
        return round <= 1 ? difference === 0 : difference <= 1
      })
      return (
        sharedSports.length > 0 &&
        hasTimeOverlap &&
        hasSkillMatch &&
        person.km <= Number(applied.km) &&
        (applied.style === "Any style" || person.style === applied.style)
      )
    })
    .sort(
      (a, b) =>
        skillGap(a) - skillGap(b) ||
        sharedWindow(b) - sharedWindow(a) ||
        a.km - b.km,
    )
  const simulatedRoundTwoCandidates = demoMatchPeople
    .slice(0, 3)
    .map((person) => ({
      ...person,
      sports: [...new Set([...person.sports, ...applied.sports])],
      level: applied.levels[applied.sports[0]] || person.level,
      days: [...new Set([...person.days, ...Object.keys(applied.windows)])],
      from: Object.values(applied.windows)[0]?.from || person.from,
      until: Object.values(applied.windows)[0]?.until || person.until,
    }))
  const groupCandidates =
    round === 2
      ? simulatedRoundTwoCandidates
      : compatible
          .filter((person) => round === 2 || !failedIds.includes(person.id))
          .slice(0, Math.max(0, Number(applied.groupSize) - 1))
  const requiredPlayers = Number(applied.groupSize) - 1
  const groupIsReady =
    groupCandidates.length === requiredPlayers && requiredPlayers > 0
  const allAccepted =
    groupIsReady &&
    selfAccepted &&
    groupCandidates.every((person) => responses[person.id] === "accepted")
  const acceptedCount = groupCandidates.filter(
    (person) => responses[person.id] === "accepted",
  ).length
  const totalAccepted = acceptedCount + Number(selfAccepted)

  const updateSport = (sport: string) => {
    setPrefs((current) => {
      const selected = current.sports.includes(sport)
      const sports = selected
        ? current.sports.filter((item) => item !== sport)
        : [...current.sports, sport]
      const levels = { ...current.levels }
      if (!selected && !levels[sport]) levels[sport] = "Intermediate"
      return { ...current, sports, levels }
    })
  }
  const toggleDay = (day: string) => {
    setPrefs((current) => {
      const windows = { ...current.windows }
      if (windows[day]) delete windows[day]
      else windows[day] = { from: "17:00", until: "20:00" }
      return { ...current, windows }
    })
  }
  const find = (event: FormEvent) => {
    event.preventDefault()
    if (!prefs.sports.length || !Object.keys(prefs.windows).length) {
      setError("Choose at least one sport and one available time window.")
      return
    }
    setError("")
    setApplied(prefs)
    setRound(1)
    setFailedIds([])
    setResponses({})
    setSelfAccepted(false)
    setMatchConnected(false)
  }
  const continueMatching = () => {
    if (round >= 2) {
      const timeSummary = Object.entries(applied.windows)
        .map(([day, window]) => day + " " + window.from + "–" + window.until)
        .join(" · ")
      const levelSummary = applied.sports
        .map((sport) => sport + ": " + applied.levels[sport])
        .join(", ")
      const sport = applied.sports[0] || "Tennis"
      model.add({
        id: Math.max(0, ...model.activities.map((activity) => activity.id)) + 1,
        sport,
        title: sport + " game · Smart Match",
        type: "Players Wanted",
        date: "Weekly availability",
        time: timeSummary,
        location: "Vienna",
        district: "Vienna",
        level: levelSummary,
        spots: Math.max(
          0,
          Number(applied.groupSize) - groupCandidates.length - 1,
        ),
        capacity: Number(applied.groupSize),
        organiser: "Smart Match",
        organiserRole: "Participant",
        image:
          model.activities.find((activity) => activity.sport === sport)
            ?.image || initialActivities[0].image,
        description:
          "Smart Match found " +
          groupCandidates.length +
          " players plus you. " +
          (Number(applied.groupSize) - groupCandidates.length - 1) +
          " places remain open. Available: " +
          timeSummary +
          ". Skill preferences: " +
          levelSummary +
          ".",
        instant: true,
        distance: applied.km + " km",
      })
      notify("Your game is now on the homepage with 2 places open.")
      navigate("home")
      return
    }
    setFailedIds((current) => [
      ...current,
      ...groupCandidates.map((person) => person.id),
    ])
    setResponses({})
    setSelfAccepted(false)
    setRound((current) => current + 1)
  }
  const respond = (personId: number, accepted: boolean) => {
    if (!accepted) {
      continueMatching()
      return
    }
    setResponses((current) => ({ ...current, [personId]: "accepted" }))
  }
  useEffect(() => {
    if (allAccepted) setMatchConnected(true)
  }, [allAccepted, setMatchConnected])

  return (
    <div className="people-match-page">
      <PageHeader
        title="Smart Match"
        subtitle="Choose your sports and availability. We’ll find a group that fits. Everyone joins as a participant, no organizer is needed."
      />
      <section className="people-match-hero">
        <div className="people-match-copy">
          <p className="eyebrow">A group that fits your week</p>
          <h1>
            Your sport.
            <br />
            Your time.
          </h1>
          <p>
            Smart Match combines sport, overlapping availability and skill level
            to suggest the best possible group.
          </p>
        </div>
        <div className="people-match-art" aria-hidden="true">
          <span className="people-orbit orbit-a" />
          <span className="people-orbit orbit-b" />
          <span className="people-you">You</span>
          <span className="people-orbit-avatar orbit-maya">MK</span>
          <span className="people-orbit-avatar orbit-jonas">JL</span>
          <span className="people-orbit-avatar orbit-leonie">LW</span>
          <span className="people-art-label">
            <Icon name="calendar" size={15} /> Same time. Same game.
          </span>
        </div>
      </section>

      <section
        className="people-preferences"
        aria-label="Your matching preferences"
      >
        <div className="people-pref-summary">
          <div>
            <p className="eyebrow">I’d like to play</p>
            <h2>
              {applied.sports.length
                ? applied.sports.join(" + ")
                : "Choose your sports"}
              <span> with a group that fits.</span>
            </h2>
          </div>
          <Button variant="outline" onClick={() => setEditing(!editing)}>
            <Icon name="sliders" size={16} />
            {editing ? "Close preferences" : "Edit preferences"}
          </Button>
        </div>
        <div className="people-pref-chips">
          {applied.sports.map((sport) => (
            <span key={sport}>
              <Icon name="star" size={15} />
              {sport}: {applied.levels[sport]}
            </span>
          ))}
          <span>
            <Icon name="calendar" size={15} />
            {Object.entries(applied.windows)
              .map(([day, time]) => day + " " + time.from + "–" + time.until)
              .join(" · ") || "No time selected"}
          </span>
          <span>
            <Icon name="location" size={15} />
            Within {applied.km} km · Vienna
          </span>
          <span>Group of {applied.groupSize}, including you</span>
        </div>
        {editing && (
          <form className="people-pref-form form-card" onSubmit={find}>
            {error && <p role="alert">{error}</p>}
            <fieldset className="match-days">
              <legend>Sports you’d like to play</legend>
              <div>
                {sportNames
                  .filter((sport) => sport !== "Padel" && sport !== "More")
                  .map((sport) => (
                    <button
                      type="button"
                      key={sport}
                      aria-pressed={prefs.sports.includes(sport)}
                      className={prefs.sports.includes(sport) ? "selected" : ""}
                      onClick={() => updateSport(sport)}
                    >
                      {sport}
                    </button>
                  ))}
              </div>
            </fieldset>
            {prefs.sports.map((sport) => (
              <label key={sport}>
                {sport} skill level
                <select
                  value={prefs.levels[sport] || "Intermediate"}
                  onChange={(event) =>
                    setPrefs({
                      ...prefs,
                      levels: { ...prefs.levels, [sport]: event.target.value },
                    })
                  }
                >
                  {["Beginner", "Intermediate", "Pro"].map((level) => (
                    <option key={level}>{level}</option>
                  ))}
                </select>
              </label>
            ))}
            <div className="form-grid">
              <label>
                Group size, including you
                <select
                  value={prefs.groupSize}
                  onChange={(event) =>
                    setPrefs({ ...prefs, groupSize: event.target.value })
                  }
                >
                  {["2", "3", "4", "5", "6"].map((size) => (
                    <option key={size} value={size}>
                      {size} people
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Travel distance
                <select
                  value={prefs.km}
                  onChange={(event) =>
                    setPrefs({ ...prefs, km: event.target.value })
                  }
                >
                  {["2", "5", "10"].map((distance) => (
                    <option key={distance} value={distance}>
                      Within {distance} km
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Play style
                <select
                  value={prefs.style}
                  onChange={(event) =>
                    setPrefs({ ...prefs, style: event.target.value })
                  }
                >
                  <option>Any style</option>
                  <option>Casual</option>
                  <option>Competitive</option>
                </select>
              </label>
            </div>
            <fieldset className="match-days">
              <legend>Your weekly availability</legend>
              <div>
                {days.map((day) => (
                  <button
                    type="button"
                    key={day}
                    aria-pressed={Boolean(prefs.windows[day])}
                    className={prefs.windows[day] ? "selected" : ""}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </fieldset>
            {Object.entries(prefs.windows).map(([day, window]) => (
              <div className="availability-row" key={day}>
                <strong>{day}</strong>
                <label>
                  Free from
                  <input
                    type="time"
                    value={window.from}
                    onChange={(event) =>
                      setPrefs({
                        ...prefs,
                        windows: {
                          ...prefs.windows,
                          [day]: { ...window, from: event.target.value },
                        },
                      })
                    }
                  />
                </label>
                <label>
                  Free until
                  <input
                    type="time"
                    value={window.until}
                    onChange={(event) =>
                      setPrefs({
                        ...prefs,
                        windows: {
                          ...prefs.windows,
                          [day]: { ...window, until: event.target.value },
                        },
                      })
                    }
                  />
                </label>
              </div>
            ))}
            <div className="people-pref-actions">
              <small>
                Longer time windows make it easier to find an overlap.
              </small>
              <Button type="submit">
                Find my group <Icon name="arrow" size={17} />
              </Button>
            </div>
          </form>
        )}
      </section>

      {round > 0 && (
        <>
          <div className="people-result-heading">
            <div>
              <p className="eyebrow">MATCH ROUND {round} OF 3</p>
              <h2>
                {groupIsReady
                  ? "A group is waiting for you"
                  : round === 2
                    ? "Three players found"
                    : "Searching for a group"}
              </h2>
              <p>
                {round === 1
                  ? "First we look for an exact skill-level match."
                  : "Sport and time still match. We’re allowing a wider skill-level range."}
              </p>
            </div>
            <span className="people-demo-label">
              {round === 2
                ? groupCandidates.length +
                  1 +
                  "/" +
                  applied.groupSize +
                  " places filled"
                : totalAccepted + "/" + applied.groupSize + " accepted"}
            </span>
          </div>
          <section className="people-group-status">
            <div>
              <p className="eyebrow">
                {allAccepted || matchConnected
                  ? "MATCH CONFIRMED"
                  : "GROUP INVITATION"}
              </p>
              <h3>
                {applied.sports.join(" + ")} · {applied.groupSize} players
              </h3>
              <p>
                {groupIsReady
                  ? allAccepted
                    ? "Everyone accepted. Your group chat is ready."
                    : totalAccepted +
                      " of " +
                      applied.groupSize +
                      " players accepted. Everyone must confirm before the group chat opens."
                  : round === 2
                    ? groupCandidates.length +
                      " people found + you · " +
                      (groupCandidates.length + 1) +
                      "/" +
                      applied.groupSize +
                      " places filled · " +
                      (Number(applied.groupSize) - groupCandidates.length - 1) +
                      " places open."
                    : "We found " +
                      groupCandidates.length +
                      " of " +
                      requiredPlayers +
                      " needed players."}
              </p>
              {groupIsReady && !allAccepted && (
                <p role="status">
                  Invited players have 24 hours to respond. A decline or timeout
                  starts the next matching attempt.
                </p>
              )}
            </div>
            <div className="people-group-status-actions">
              {allAccepted || matchConnected ? (
                <Button onClick={() => navigate("messages")}>
                  Open group chat
                </Button>
              ) : groupIsReady ? (
                <>
                  <Button
                    disabled={selfAccepted}
                    onClick={() => setSelfAccepted(true)}
                  >
                    {selfAccepted
                      ? "You accepted · waiting for others"
                      : "Accept this match"}
                  </Button>
                  <Button variant="ghost" onClick={continueMatching}>
                    Decline match
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={continueMatching}>
                  {round === 2
                    ? "Add game to homepage"
                    : "Try next matching round"}
                </Button>
              )}
            </div>
          </section>
          {groupCandidates.length > 0 ? (
            <div className="people-cards">
              {groupCandidates.map((person) => (
                <article
                  className={"people-card tone-" + person.tone}
                  key={person.id}
                >
                  <div className="people-card-cover">
                    <span className="people-sport-label">
                      {applied.sports.find((sport) =>
                        person.sports.includes(sport),
                      )}
                    </span>
                    <div className="people-card-avatar">{person.initials}</div>
                    <span className="people-shared-badge">
                      <Icon name="calendar" size={13} /> Shared free time
                    </span>
                  </div>
                  <div className="people-card-body">
                    <div className="people-card-name">
                      <h3>{person.name}</h3>
                      <span>{person.km} km away</span>
                    </div>
                    <Tag>{person.level}</Tag>
                    <p className="people-bio">{person.bio}</p>
                    <div className="people-overlap">
                      <Icon name="calendar" size={17} />
                      <span>
                        <small>Shared time</small>
                        <strong>
                          {person.days
                            .filter((day) => applied.windows[day])
                            .join(", ") ||
                            "Available in your selected window"}{" "}
                          · {person.from}–{person.until}
                        </strong>
                      </span>
                    </div>
                    <div className="people-why">
                      <Icon name="check" size={14} />
                      <span>
                        {round === 1
                          ? "Same skill level"
                          : "Skill level may vary by one step"}{" "}
                        · invitation expires in 24 hours
                      </span>
                    </div>
                    <details>
                      <summary>
                        {responses[person.id] === "accepted"
                          ? "Accepted"
                          : "Preview participant response"}
                      </summary>
                      <div className="people-card-actions">
                        <Button
                          variant="outline"
                          onClick={() => respond(person.id, true)}
                        >
                          Simulate acceptance
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => respond(person.id, false)}
                        >
                          Simulate decline or timeout
                        </Button>
                      </div>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No complete group found yet"
              copy={
                round === 1
                  ? "We’ll keep your sport and time fixed, then try a wider skill-level range in the next round."
                  : "We couldn’t complete a group in this round. Try the next combination; after three attempts your request moves to Discover."
              }
              action="Try next matching round"
              onAction={continueMatching}
            />
          )}
        </>
      )}
    </div>
  )
}

function MapPage({
  navigate,
  favourites,
  toggleFavourite,
  setSelected,
  embedded = false,
  onGrid,
  filtered,
}: SharedPageProps & {
  embedded?: boolean
  onGrid?: () => void
  filtered?: Activity[]
}) {
  const { activities } = useContext(GameContext)

  const mapItems =
    filtered || activities.filter((a) => a.status !== "cancelled")
  const [activeId, setActiveId] = useState(mapItems[0]?.id)
  const active = mapItems.find((a) => a.id === activeId) || mapItems[0]
  const setActive = (a: Activity) => setActiveId(a.id)
  if (!active)
    return (
      <div className="container page-space">
        <EmptyState
          title="No games on the map"
          copy="Try changing your filters."
          action="Back to results"
          onAction={() => (onGrid ? onGrid() : navigate("discover"))}
        />
      </div>
    )
  return (
    <div className={embedded ? "container page-space" : "map-page"}>
      <PageHeader
        title="Explore the map"
        subtitle="See what’s happening around Vienna."
        action={
          embedded && (
            <Button variant="outline" onClick={onGrid}>
              <Icon name="grid" size={17} />
              Grid View
            </Button>
          )
        }
      />
      <div className="map-layout">
        <aside className="map-results">
          <div className="map-filters">
            <button className="selected">All sports</button>
            <button>This week</button>
            <button>5 km</button>
          </div>
          {mapItems.slice(0, 5).map((activity) => (
            <button
              key={activity.id}
              className={`map-result ${
                active.id === activity.id ? "active" : ""
              }`}
              onClick={() => setActive(activity)}
            >
              <img src={activity.image} alt="" />
              <span>
                <small>
                  {activity.sport} · {activity.type}
                </small>
                <strong>{activity.title}</strong>
                <em>
                  {activity.date} · {activity.distance}
                </em>
              </span>
            </button>
          ))}
        </aside>
        <div className="map-canvas">
          <span className="map-river" />
          {[
            ["18%", "28%"],
            ["63%", "22%"],
            ["48%", "57%"],
            ["78%", "70%"],
            ["25%", "76%"],
          ]
            .slice(0, mapItems.length)
            .map(([left, top], index) => (
              <button
                key={left}
                style={{ left, top }}
                className={`activity-marker ${
                  active.id === mapItems[index].id ? "active" : ""
                }`}
                onClick={() => setActive(mapItems[index])}
              >
                <SportMark sport={mapItems[index].sport} />
              </button>
            ))}
          <div className="map-street street-one" />
          <div className="map-street street-two" />
          <div className="map-street street-three" />
          <article className="map-preview">
            <img src={active.image} alt="" />
            <div>
              <small>
                {active.sport} · {active.distance}
              </small>
              <h3>{active.title}</h3>
              <p>
                {active.date}, {active.time}
              </p>
              <button
                onClick={() => {
                  setSelected(active)
                  navigate("detail")
                }}
              >
                View activity <Icon name="arrow" size={16} />
              </button>
            </div>
            <IconButton
              label="Save activity"
              icon="heart"
              active={favourites.includes(active.id)}
              onClick={() => toggleFavourite(active.id)}
            />
          </article>
        </div>
      </div>
    </div>
  )
}

function AuthPage({ navigate }: SharedPageProps) {
  const { setSignedIn } = useContext(GameContext)
  const [error, setError] = useState(false)
  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img
          src="https://images.unsplash.com/photo-1765776035390-e9f3d5080cb3?auto=format&fit=crop&w=1200&q=88"
          alt=""
        />
        <Logo onClick={() => navigate("home")} />
        <div>
          <p className="eyebrow">Find your sport. Meet your team.</p>
          <h1>
            Movement is better
            <br />
            when it’s <em>shared.</em>
          </h1>
        </div>
      </div>
      <div className="auth-form-wrap">
        <section className="auth-form">
          <p className="eyebrow">Welcome to sportTogether</p>
          <h2>Your next game starts here.</h2>
          <p>
            Sign in with email or Google to join games and organise your own.
            One account, both roles.
          </p>
          <div className="auth-credentials">
            <label className="auth-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="name@example.com"
                required
              />
            </label>
            <label className="auth-field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
            </label>
            <Button
              className="full-button"
              onClick={() => {
                setSignedIn(true)
                navigate("onboarding")
              }}
            >
              Log in <Icon name="arrow" size={17} />
            </Button>
          </div>
          <p className="auth-register">
            No account yet?{" "}
            <button
              type="button"
              onClick={() => {
                setSignedIn(true)
                navigate("onboarding")
              }}
            >
              Register
            </button>
          </p>
          {error && (
            <div role="alert" className="surface-card">
              Sign-in did not complete. Please try again.
            </div>
          )}
          <Button
            className="full-button"
            onClick={() => {
              setSignedIn(true)
              navigate("onboarding")
            }}
          >
            Continue with Google <Icon name="arrow" size={17} />
          </Button>
          <details style={{ marginTop: 24 }}>
            <summary>Preview sign-in error</summary>
            <Button variant="outline" onClick={() => setError(true)}>
              Simulate interrupted sign-in
            </Button>
          </details>
          <Button variant="ghost" onClick={() => navigate("home")}>
            Explore games first
          </Button>
        </section>
      </div>
    </div>
  )
}

function OnboardingPage({ navigate }: SharedPageProps) {
  const [step, setStep] = useState(1)
  const [sports, setSports] = useState<string[]>(["Tennis"])
  const next = () => (step < 5 ? setStep(step + 1) : navigate("home"))
  return (
    <div className="onboarding-page">
      <header>
        <Logo onClick={() => navigate("home")} />
        <span>Step {step} of 5</span>
      </header>
      <div className="progress">
        <span style={{ width: `${step * 20}%` }} />
      </div>
      <main>
        {step === 1 && (
          <div className="onboarding-copy">
            <p className="eyebrow">Welcome to sportTogether</p>
            <h1>
              Your active life,
              <br />
              <em>more connected.</em>
            </h1>
            <p>
              We’ll take a minute to personalise the people, places and
              activities you see.
            </p>
          </div>
        )}
        {step === 2 && (
          <div className="onboarding-copy wide">
            <p className="eyebrow">Your sports</p>
            <h1>What gets you moving?</h1>
            <p>Choose as many as you like. You can update this any time.</p>
            <div className="onboarding-sports">
              {sportNames.slice(0, -1).map((sport) => (
                <button
                  key={sport}
                  onClick={() =>
                    setSports(
                      sports.includes(sport)
                        ? sports.filter((item) => item !== sport)
                        : [...sports, sport],
                    )
                  }
                  className={sports.includes(sport) ? "selected" : ""}
                >
                  <SportMark sport={sport} />
                  {sport}
                  {sports.includes(sport) && <Icon name="check" size={17} />}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="onboarding-copy">
            <p className="eyebrow">Set your pace</p>
            <h1>How do you like to play?</h1>
            <p>This helps us suggest the right groups. It’s not a test.</p>
            <div className="level-options">
              {["Beginner", "Intermediate", "Pro"].map((level, index) => (
                <button key={level} className={index === 1 ? "selected" : ""}>
                  <span>{index + 1}</span>
                  <strong>{level}</strong>
                  <small>
                    {
                      [
                        "Learning the basics",
                        "Comfortable and improving",
                        "Confident and competitive",
                      ][index]
                    }
                  </small>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="onboarding-copy">
            <p className="eyebrow">Your neighbourhood</p>
            <h1>Where should we look?</h1>
            <p>We’ll use this to show you relevant activities close by.</p>
            <label className="onboarding-location">
              <Icon name="location" />
              <input defaultValue="Vienna, Austria" />
            </label>
            <div className="location-visual">
              <span>
                <Icon name="location" />
              </span>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="onboarding-copy completion">
            <div className="success-mark">
              <Icon name="check" size={28} />
            </div>
            <p className="eyebrow">You’re all set</p>
            <h1>
              Welcome to your
              <br />
              <em>new community.</em>
            </h1>
            <p>We found 32 activities near Vienna that match your interests.</p>
          </div>
        )}
        <div className="onboarding-actions">
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <Button onClick={next}>
            {step === 5 ? "Start Exploring" : "Continue"}
            <Icon name="arrow" size={17} />
          </Button>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [selectedId, setSelectedId] = useState(initialActivities[0].id)
  const selected =
    activities.find((item) => item.id === selectedId) || activities[0]
  const setSelected = (item: Activity) => setSelectedId(item.id)
  const [bookings, setBookings] = useState<number[]>([2, 4])
  const [signedIn, setSignedIn] = useState(false)
  const [editing, setEditing] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const update = (id: number, patch: Partial<Activity>) =>
    setActivities((items) =>
      items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    )
  const join = (id: number) => {
    const game = activities.find((item) => item.id === id)
    if (!game || game.status === "cancelled")
      return "This game has been cancelled."
    if (bookings.includes(id) || game.owned)
      return "You already have a place in this game."
    if (game.spots < 1)
      return "The last place has just been taken. Please choose another game."
    setBookings((items) => [...items, id])
    update(id, { spots: game.spots - 1 })
    return null
  }
  const leave = (id: number) => {
    const game = activities.find((item) => item.id === id)
    setBookings((items) => items.filter((item) => item !== id))
    if (game && bookings.includes(id))
      update(id, { spots: Math.min(game.capacity, game.spots + 1) })
  }
  const add = (game: Activity, booked = false) => {
    setActivities((items) => [...items, game])
    if (booked || game.organiser === "Smart Match")
      setBookings((items) => [...items, game.id])
  }
  const [matchName, setMatchName] = useState("Playing partner")
  const model: GameModel = {
    matchName,
    setMatchName,
    activities,
    bookings,
    signedIn,
    setSignedIn,
    update,
    join,
    leave,
    add,
    editing,
    setEditing,
    search,
    setSearch,
  }
  const [favourites, setFavourites] = useState<number[]>([1, 3])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState("")
  const [matchConnected, setMatchConnected] = useState(false)

  const navigate = (destination: Page) => {
    setPage(destination)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleFavourite = (id: number) => {
    setFavourites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
    notify(
      favourites.includes(id)
        ? "Removed from favourites"
        : "Saved to favourites",
    )
  }

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2200)
  }

  const shared = {
    navigate,
    favourites,
    toggleFavourite,
    selected,
    setSelected,
    notify,
  }
  const pages: Record<Page, ReactNode> = {
    home: <HomePage {...shared} />,

    discover: <DiscoverPage {...shared} />,

    detail: <DetailPage {...shared} />,

    booking: <BookingPage {...shared} />,

    success: <SuccessPage {...shared} />,

    "my-activities": <MyActivitiesPage {...shared} />,

    create: <CreatePage key={editing ?? "new"} {...shared} />,

    profile: <ProfilePage />,

    favourites: <FavouritesPage {...shared} />,

    messages: <MessagesPage matchConnected={matchConnected} />,

    map: <MapPage {...shared} />,

    auth: <AuthPage {...shared} />,

    onboarding: <OnboardingPage {...shared} />,

    "smart-match": (
      <SmartMatchPage
        navigate={navigate}
        notify={notify}
        matchConnected={matchConnected}
        setMatchConnected={setMatchConnected}
      />
    ),
  }

  const standalone = page === "auth" || page === "onboarding"
  return (
    <GameContext.Provider value={model}>
      <div className="app">
        {!standalone && (
          <AppNavigation
            page={page}
            navigate={navigate}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        )}
        {pages[page]}
        {!standalone && (
          <footer className="footer">
            <div className="container">
              <Logo onClick={() => navigate("home")} />

              <p>Find your sport. Meet your team.</p>

              <div>
                <button onClick={() => navigate("discover")}>
                  Explore Activities
                </button>

                <button onClick={() => navigate("my-activities")}>
                  My Activities
                </button>

                <button onClick={() => navigate("auth")}>Log in</button>

                <button>Safety</button>

                <button>Help</button>
              </div>
            </div>
          </footer>
        )}
        {toast && (
          <div className="toast" role="status">
            <Icon name="check" size={17} />
            {toast}
          </div>
        )}
      </div>
    </GameContext.Provider>
  )
}
