// serviceMenuData.js

const serviceMenuItem = [
  {
    title: "COMPONENTS",
    items: [
      { name: "Wheelset Build (1 Wheel)", price: "IDR 150.000" },
      { name: "Integrated Dropbar Assembly", price: "IDR 150.000" },
      { name: "Dropbar / Stem / Seatpost Assembly", price: "IDR 100.000" },
      { name: "Spoke Exchange / Assembly", price: "IDR 100.000" },
      { name: "Carbon / Alloy Fork Cutting", price: "IDR 100.000" },
      { name: "Headset Bearing Assembly", price: "IDR 100.000" },
      { name: "Wheelset Bearing Assembly", price: "IDR 75.000" },
      { name: "Tubular Tire Assembly (excl. Tape)", price: "IDR 75.000" },
      { name: "Tubeless Tire Assembly (excl. Sealant)", price: "IDR 75.000" },
      { name: "Wheelset Setting & Truing (1 Wheel)", price: "IDR 75.000" },
      { name: "Clincher Tire Assembly", price: "IDR 50.000" },
      { name: "Carbon / Alloy Seatpost Cutting", price: "IDR 50.000" },
      { name: "BarTape Assembly", price: "IDR 50.000" },
    ],
  },
  {
    title: "MASTER BUILD",
    items: [
      { name: "Disc Brake Groupset Assembly", price: "IDR 500.000" },
      { name: "Rim Brake Groupset Assembly", price: "IDR 450.000" },
      { name: "Groupset Disassembly", price: "IDR 150.000" },
      { name: "Groupset Exchange 1.2 Package", price: "IDR 750.000" },
      { name: "Groupset Exchange 2.2 Package", price: "IDR 900.000" },
      { name: "Bike Packing for Travel", price: "IDR 150.000" },
      { name: "Bike Assembly from Bike Box", price: "IDR 200.000" },
      { name: "Additional Box for Packing", price: "IDR 50.000" },
    ],
  },
  {
    title: "DRIVETRAIN",
    items: [
      { name: "FD / RD Assembly + Setting", price: "IDR 100.000" },
      { name: "Bottom Bracket Assembly", price: "IDR 100.000" },
      { name: "Crankset / Chainring Assembly", price: "IDR 100.000" },
      { name: "OSPW Assembly", price: "IDR 100.000" },
      { name: "Mechanical Rim Brake Assembly", price: "IDR 50.000" },
      { name: "Brakeset Bleeding (1 Brake)", price: "IDR 75.000" },
      { name: "Hydraulic Cable Assembly / Exchange", price: "IDR 75.000" },
      { name: "Hood Shifter Exchange", price: "IDR 75.000" },
      { name: "Cassette Assembly", price: "IDR 50.000" },
      { name: "Chain Assembly", price: "IDR 50.000" },
      { name: "FD / RD Assembly", price: "IDR 50.000" },
      { name: "Sprocket Assembly", price: "IDR 50.000" },
    ],
  },
  {
    title: "SERVICE PACKAGE",
    items: [
      {
        name: "FULL OVERHAUL PACKAGE",
        price: "IDR 350.000",
        details: [
          "General Bike Check (Headset, BB, Chain, Pedal, Brake, Wheelset, Shifter Checking)",
          "General Bike Degrease & Greasing (Headset, BB, Chain, Pedal, Hub)",
          "Brakeset Setting & Bleeding",
          "General Bike Washing & Protect (Full outer bike wash + Frame Protection)",
          "Assembly Screw Torque Checking (Seatpost, Stem, Dropbar, Shifter)",
          "FD & RD Calibration & Tune Up",
          "Tire Pressure Check",
          "Bike wash",
        ],
      },
      {
        name: "MEDIUM SERVICE PACKAGE",
        price: "IDR 250.000",
        details: [
          "General Bike Check (Headset, BB, Chain, Pedal, Brake, Wheelset, Shifter Checking)",
          "Assembly Screw Torque Checking (Seatpost, Stem, Dropbar, Shifter)",
          "Standard Bike Cleaning (Spray & Wipe)",
          "FD & RD Calibration & Tune Up",
          "Tire Pressure Check",
          "Bike wash",
        ],
      },
      {
        name: "BASIC SERVICE PACKAGE",
        price: "IDR 150.000",
        details: ["Check shifting RD/FD", "Check Brake", "Chain lubrication"],
      },
    ],
  },
];

export default serviceMenuItem;
