# ece461-project
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ece461-project
$ run COMMAND
running command...
$ run (--version)
ece461-project/0.0.0 darwin-arm64 node-v20.4.0
$ run --help [COMMAND]
USAGE
  $ run COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`run hello PERSON`](#run-hello-person)
* [`run hello world`](#run-hello-world)
* [`run help [COMMANDS]`](#run-help-commands)
* [`run plugins`](#run-plugins)
* [`run plugins:install PLUGIN...`](#run-pluginsinstall-plugin)
* [`run plugins:inspect PLUGIN...`](#run-pluginsinspect-plugin)
* [`run plugins:install PLUGIN...`](#run-pluginsinstall-plugin-1)
* [`run plugins:link PLUGIN`](#run-pluginslink-plugin)
* [`run plugins:uninstall PLUGIN...`](#run-pluginsuninstall-plugin)
* [`run plugins:uninstall PLUGIN...`](#run-pluginsuninstall-plugin-1)
* [`run plugins:uninstall PLUGIN...`](#run-pluginsuninstall-plugin-2)
* [`run plugins update`](#run-plugins-update)

## `run hello PERSON`

Say hello

```
USAGE
  $ run hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/ayushuk/ece461-project/blob/v0.0.0/dist/commands/hello/index.ts)_

## `run hello world`

Say hello world

```
USAGE
  $ run hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ run hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [dist/commands/hello/world.ts](https://github.com/ayushuk/ece461-project/blob/v0.0.0/dist/commands/hello/world.ts)_

## `run help [COMMANDS]`

Display help for run.

```
USAGE
  $ run help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for run.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.18/src/commands/help.ts)_

## `run plugins`

List installed plugins.

```
USAGE
  $ run plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ run plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/index.ts)_

## `run plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ run plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ run plugins add

EXAMPLES
  $ run plugins:install myplugin 

  $ run plugins:install https://github.com/someuser/someplugin

  $ run plugins:install someuser/someplugin
```

## `run plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ run plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ run plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/inspect.ts)_

## `run plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ run plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ run plugins add

EXAMPLES
  $ run plugins:install myplugin 

  $ run plugins:install https://github.com/someuser/someplugin

  $ run plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/install.ts)_

## `run plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ run plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ run plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/link.ts)_

## `run plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ run plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ run plugins unlink
  $ run plugins remove
```

## `run plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ run plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ run plugins unlink
  $ run plugins remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/uninstall.ts)_

## `run plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ run plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ run plugins unlink
  $ run plugins remove
```

## `run plugins update`

Update installed plugins.

```
USAGE
  $ run plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/update.ts)_
<!-- commandsstop -->
