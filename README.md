# Joodland Website

The Joodland Website is a travel booking platform built on the robust Next.js framework and TypeScript. The website provides features for browsing and booking flights, with potential extensions for hotel reservations.

## Technologies and Key Packages

The Joodland Website utilizes the following technologies and key packages:

- **Next.js**: A powerful React framework for building server-rendered applications.

- **TypeScript**: A statically typed superset of JavaScript, providing enhanced developer productivity and code quality.

- **React**: A popular JavaScript library for building user interfaces.

- **next-intl**: A library used for internationalization, enabling the localization of content for different locales.

- **Framer Motion**: A motion library for creating smooth animations and delightful user interactions.

- **Storybook**: A development environment for building, testing, and showcasing UI components in isolation.

- **CVA**: A lightweight validation library for validating form inputs.

- **Tailwind CSS**: A utility-first CSS framework that enables rapid UI development with pre-defined styles and classes.

## Key Directories and Files

### `components`

This directory houses all the React components used across the application. It's organized into several subdirectories:

- `blocks`: Here you'll find larger, composite components like `cards`, `dateslist`, `flash`, and `tabs`.

- `elements`: This directory contains smaller, fundamental components like `button`, `dropdown`, and `textinput`.

- `pages`: This contains the components representing distinct pages of the site. The `flights` page component, which is responsible for displaying flight data, is currently present.

- `templates`: This directory encapsulates the layout components of the website, including templates for `flights`, `home`, `hotels`, and `nav`.

### `lib`

The `lib` directory is the place for shared logic, custom React hooks, and TypeScript interfaces which are utilized across the application. This includes subdirectories for `functions`, `hooks`, and `interfaces`.

### `messages`

Localization messages for the website are stored here. The `en.json` file holds the English locale messages for various sections of the site, including "common", "flights", "hotels", "nav", "home", and "searchFilters".

## Internationalization

Internationalization is handled using the `next-intl` library, making it possible to deliver locale-specific content to users. Localization messages, required for this feature, are stored in the `messages` directory.

Please note that this is a preliminary README. As the project evolves, this document should be updated accordingly. Moreover, more detailed documentation might be required for individual components and the logic embedded within the `lib` directory.
