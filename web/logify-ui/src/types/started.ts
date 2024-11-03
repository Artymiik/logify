export function InstallLibrary(language: string) {
  if (language == "js") {
    return [
      {
        id: "JavaScript",
        title: "Install NPM Package",
        install: "Install the logify library via CMD.",
        code_install: `npm install logify`,
        import:
          "Import the log function to interact with logs from the library",
        code_import: `import { log } from 'logify';`,
      },
    ];
  } else if (language == "ts") {
    return [
      {
        id: "TypeScript",
        title: "Install NPM Package",
        install: "Install the logify library via CMD.",
        code_install: `npm install logify`,
        import:
          "Import the log function to interact with logs from the library",
        code_import: `import { log } from 'logify';`,
      },
    ];
  } else if (language == "c#") {
    return [
      {
        id: "C#",
        title: "Install NuGet Package",
        install: "Install the logify library via CMD.",
        code_install: `dotnet add package logify.net`,
        import:
          "Import the log function to interact with logs from the library",
        code_import: `using logify.net;`,
      },
    ];
  } else if (language == "golang") {
  } else {
  }
}

export function StartedLibrary(language: string) {
  if (language == "js") {
    return [
      {
        id: "JavaScript",
        title: "Getting started",
        description:
          "To connect and interact with your log, click on the button in the dashboard to copy the unique uuid of the log",
        description2:
          "After that, you can use the uuid to interact with your log directly from JavaScript! Insert it in a secure location, for example: .env | .env.local. then use this variable in the functions",
        code: `UNIQUE_UIID_LOG = unique_log`,
        started:
          "Now copy the code of your log to the dashboard, replacing the connect line with your own",
        code_started: `log.insert(UNIQUE_UIID_LOG, {
  statusCode: 200,
  responseMessage: 'This is server response',
})`,
      },
    ];
  } else if (language == "ts") {
    return [
      {
        id: "TypeScript",
        title: "Getting started",
        description:
          "To connect and interact with your log, click on the button in the dashboard to copy the unique uuid of the log",
        description2:
          "After that, you can use the uuid to interact with your log directly from TypeScript! Insert it in a secure location, for example: .env | .env.local. then use this variable in the functions",
        code: `UNIQUE_UIID_LOG = unique_log`,
        started:
          "Now copy the code of your log to the dashboard, replacing the connect line with your own",
        code_started: `log.insert(UNIQUE_UIID_LOG, {
  statusCode: 200,
  responseMessage: 'This is server response',
})`,
      },
    ];
  } else if (language == "c#") {
    return [
      {
        id: "C#",
        title: "Getting started",
        description:
          "To connect and interact with your log, click on the button in the dashboard to copy the unique uuid of the log",
        description2:
          "After that, you can use the uuid to interact with your log directly from TypeScript! Insert it in a secure location, for example: .env | .env.local. then use this variable in the functions",
        code: `UNIQUE_UIID_LOG = unique_log`,
        started:
          "Now copy the code of your log to the dashboard, replacing the connect line with your own",
        code_started: `var arg = new cs_lib.Models.Args
{
    StatusCode = "200",
    Email = "artemiik@gmail.com",
    IPAddress = "192.168.0.1",
    GPS = "st-103-10",
    Authenticate = "jwt-v1",
};

_log.Insert(UNIQUE_UIID_LOG, arg);`,
      },
    ];
  } else if (language == "golang") {
  } else {
  }
}

export function DetailInfo(language: string) {
  if (language == "js") {
    return [
      {
        id: "JavaScript",
        title: "Additionally",
        description:
          "Use IPAddress and GPS in your projects to get information about users.",
        description2:
          "In addition to insert, there is a log.select(logName), client.signin(email, password), client.log('delete', logName), client.log('create', args)",
        code_ip_gps: `log.insert({
  name: ::getIPv4(),
  gps: ::getGPS(),
})`,
        code_started: `// Select all data file
// ====================
log.select({
  name: 'signin log',
  router: 'signin',
  category: 'Safety',
})

// SignIn to logify
// ================
client.signin({
  email: "test@test.com",
  password: "test234",
})

// Delete log in logify
// ====================
client.log("delete", logName)

// Create log in logify
// ====================
client.log("create", {
  name: "test log",
  router: "test",
  category: "Safety",
})`,
      },
    ];
  } else if (language == "ts") {
    return [
      {
        id: "TypScript",
        title: "Additionally",
        description:
          "Use IPAddress and GPS in your projects to get information about users.",
        description2:
          "In addition to insert, there is a log.select(logName), client.signin(email, password), client.log('delete', logName), client.log('create', args)",
        code_ip_gps: `log.insert({
  name: ::getIPv4(),
  gps: ::getGPS(),
})`,
        code_started: `// Select all data file
// ====================
log.select({
  name: 'signin log',
  router: 'signin',
  category: 'Safety',
})

// SignIn to logify
// ================
client.signin({
  email: "test@test.com",
  password: "test234",
})

// Delete log in logify
// ====================
client.log("delete", logName)

// Create log in logify
// ====================
client.log("create", {
  name: "test log",
  router: "test",
  category: "Safety",
})`,
      },
    ];
  } else if (language == "c#") {
    return [
      {
        id: "C#",
        title: "Additionally",
        description:
          "Use IPAddress and GPS in your projects to get information about users.",
        description2:
          "In addition to insert, there is a log.select(logName), client.signin(email, password), client.log('delete', logName), client.log('create', args)",
        code_ip_gps: `log.insert({
  name: ::getIPv4(),
  gps: ::getGPS(),
})`,
        code_started: `log.select({
  name: 'signin log',
  router: 'signin',
  category: 'Safety',
})`,
      },
    ];
  } else if (language == "golang") {
  } else {
  }
}
