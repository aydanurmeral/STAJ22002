interface MenuItem {
    name: string;
    icon?: string;
    showChildren?: boolean;
    children?: Array<MenuItem>;
  }
  
  interface MenuData {
    apps: Array<MenuItem>;
    ui: Array<MenuItem>;
    components: Array<MenuItem>;
    pages: Array<MenuItem>;
  }
  
  const menuData: MenuData = {
    apps: [
      { name: "Dashboard", icon: "fa-solid fa-gauge", showChildren: false, children: [{ name: "Analytical" }, { name: "eCommerce" }, { name: "Crypto" }] },
      { name: "Calendar", icon: "fa-solid fa-calendar" },
      { name: "Contacts", icon: "fa-solid fa-address-book" },
      { name: "Gallery", icon: "fa-solid fa-image" },
      { name: "Cards", icon: "fa-solid fa-credit-card" },
      { name: "Mail", icon: "fa-solid fa-envelope" },
      { name: "eCommerce", icon: "fa-solid fa-store", showChildren: false, children: [{ name: "Dashboard" }, { name: "Shop" }, { name: "Products" }, { name: "Product Detail" }, { name: "New Product" }, { name: "My Account" }, { name: "Cart" }, { name: "Checkout" }] }
    ],
    ui: [
      { name: "Layout", icon: "fa-solid fa-th-large", showChildren: false, children: [{ name: "Flexbox" }, { name: "Blank Page" }, { name: "Page Headers" }, { name: "Sidebar Right" }, { name: "Sidebar Left" }, { name: "Tabbed Page" }] },
      { name: "Themes", icon: "fa-solid fa-palette" },
      { name: "Multi Level Menu", icon: "fa-solid fa-sitemap", showChildren: false, children: [{ name: "Item One(1)" }, { name: "Item Two(2)" }, { name: "Item Three(3)" }, { name: "Item Four(4)" }] },
      { name: "Icons", icon: "fa-solid fa-icons" },
      { name: "Multi Language", icon: "fa-solid fa-globe" },
      { name: "Typography", icon: "fa-solid fa-font" },
      { name: "Helper Classes", icon: "fa-solid fa-tools" },
      { name: "Element", icon: "fa-solid fa-cube", showChildren: false, children: [
        { name: "Button" }, { name: "Radio" }, { name: "Checkbox" }, { name: "Input" }, { name: "Input Number" }, { name: "Select" }, { name: "Cascader" }, { name: "Switch" }, { name: "Slider" }, { name: "Time Picker" }, { name: "Date Picker" }, { name: "Date Time Picker" }, { name: "Upload" }, { name: "Rate" }, { name: "Color Picker" }, { name: "Transfer" }, { name: "Form" },
        { name: "Tag" }, { name: "Progress" }, { name: "Tree" }, { name: "Pagination" }, { name: "Badge" }, { name: "Alert" }, { name: "Loading" }, { name: "Message" }, { name: "Message Box" }, { name: "Notification" }, { name: "NavMenu" }, { name: "Tabs" }, { name: "Breadcrumb" }, { name: "Dropdown" }, { name: "Steps" }, { name: "Dialog" }, { name: "Tooltip" }, { name: "Popover" }, { name: "Card" }, { name: "Carousel" }, { name: "Collapse" }, { name: "Timeline" }
      ] }
    ],
    components: [
      { name: "Tables", icon: "fa-solid fa-table", showChildren: false, children: [
        { name: "Basic Table" },
        { name: "Element UI" },
        { name: "TUI Grid" }
      ] },
      { name: "Maps", icon: "fa-solid fa-map", showChildren: false, children: [
        { name: "Leaflet" },
        { name: "Mapbox" }
      ] },
      { name: "Editors", icon: "fa-solid fa-edit", showChildren: false, children: [
        { name: "Quill" },
        { name: "Pell" },
        { name: "Markdown" }
      ] },
      { name: "Charts", icon: "fa-solid fa-chart-line", showChildren: false, children: [
        { name: "Vue Chartkick" },
        { name: "Peity" },
        { name: "Echarts" }
      ] }
    ],
    pages: [
      { name: "Profile", icon: "fa-solid fa-user" },
      { name: "Authentication", icon: "fa-solid fa-lock", showChildren: false, children: [
        { name: "Login" },
        { name: "Login 2" },
        { name: "Register" },
        { name: "Forgot Password" }
      ] },
      { name: "Invoice", icon: "fa-solid fa-file-invoice" },
      { name: "404", icon: "fa-solid fa-exclamation-triangle" }
    ]
  };
  
  export default menuData;
  