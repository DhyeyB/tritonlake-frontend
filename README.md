# About NextJs-Boilerplate

TBD

This is a [Next.js](https://nextjs.org/) project bootstrapped

with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements:

-   Next 14.0.4

-   NPM 6.14.15

-   Node >=v18.17

## Technical Details:

-   Frontend Framework: Next Js, Bootstrap V5

-   Source Control: Github

## Project Directory Structure

```



│ ├── .husky
│ │ └── pre-commit
│ │ 	└── this file contains all the pre-commit hooks that are executed automatically before commiting the code
│ │ 	└── lint
│ │  		└── for linting we use es-lint code standards
│ │  		└── `npm run lint` will executed to verify the es-lint code standards are followed
│ │ 	└── build
│ │ 		└── `npm run build` will executed to verify that production build is created successfully
│ ├── public
| | ├── images
| | 	└── this directory contains all the images and icons used in the application
├ ├── src
│ │ ├── app
│ │  	└── each folder in next js is a url.
│ │         └── components
│ │ 	        └── common reusable react components
| |  ├── styles
| | 	 └── scss
| | 		└── we follow scss for styling
│ | 	 	└── the default styling is bootstrap
│ | 	 	└── to write any custom scss, use \style.scss
| | ├── enums
│ │  	└── each file contains enums used in the code
| | ├── fixtures
| |  	└── each file contains static data used in different components
│ │ ├── services
│ │  	└── abstract layer to communicate to rest api
| | ├── types
| |  	└── auth
| | 		└── each file in this directory contains type information used as props for each component
| |  	└── components
| | 		└── each file in this directory contains type information used as props for each component
| | 	└── common
| | 		└── each file in this directory contains type information that is used in multiple places
│ │ ├── utils
│ │ 	└── utils has common methods which can be used on any page and component
│ │     └── constants
│ │ 	    └── this file contains all the constants used in the application
│ │ ├── validations
│ │ 	└── each file in this directory contains form-validation schemas with types used for different forms
│ │ └── README.md

```

## Getting Started

Setup .env file

```bash

Create  a  new  .env  file,  simply  run  the  following  command  in  your  terminal:

cp  .env.example  .env



This  command  will  copy  the  .env.example  file  and  create  a  new  file  called  .env.  You  can  then  edit  the  new  .env  file  to  include  the  necessary  values  for  your  application.

```

Then, install all the dependencies:

```bash

npm  ci

```

Run the development server:

```bash

npm  run  dev

# or

yarn  dev

# or

pnpm  dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Components Usage

All components are created inside components directory.

List of components:

1. Button (can be used inside forms and other various places, it can handle loading / submitting state which can be passed as props. It takes all types of props which an HTML button can have.)
2. Drag and Drop (can be used for re-ordering of any type of data using drag and drop inside react table.)
3. Dropzone (can take any type of file(s) as input and returns the file(s). It accepts all props which a react-dropzone can accept.)
4. React Select (can be used as dropdown that fetches options from an API and pagination is supported. It also accepts all props which a react-select can have.)
5. React Table (base component for HTML table.)
6. React Table With Pagination (can be used for all HTML tables that supports server side pagination.)
7. Table Pagination (base component for Pagination can be used for any type of pagination such as paginating Grid view or Card view.)
8. Auth (can be used to created protected routes. It passes user objects to the wrapped component/page.)
9. WithouAuth (can be used to create public routes or which should not accessible by authenticated users such as login or signup page.)
10. TabSection (can be used as a wrapper for other components.)
11. TabHeader (can be used inside TabSection which is renderded as a tab header contaning tab title.)
12. TabBody (can be used inside TabSection which will render children passed as props to TabBody also take other props such as loading to render loading skeleton.)

## Validations (Zod)

We have used react-hook-form with zod resolver for setting up validations. All the common validators are written inside `utils/validation.ts`.  
You can add your own custom validators using same format.  
More about validations using zod: [Zod Validations](https://zod.dev/)

## Axios HTTP Client

The `axios` HTTP client is configured with interceptors for handling authorization and response data. It provides utility methods for making various HTTP requests.

### Usage

The `FetchHelper` is imported from `services/fetch-helper.ts` and can be used throughout the application for making API calls.

### Methods

1. **GET Request**

    - **Description:** Executes a GET request to retrieve data from a specified URL.
    - **Usage:**

        ```typescript
        FetchHelper.get(url: URL, params?: Params): Promise<any>
        ```

    - **Parameters:**
        - `url` (URL): The URL to fetch data from.
        - `params` (Params, optional): Optional parameters to append to the URL query string.

2. **POST Request**

    - **Description:** Sends data to a specified URL using a POST request.
    - **Usage:**

        ```typescript
        FetchHelper.post(url: URL, data: object, params?: Params): Promise<any>
        ```

    - **Parameters:**
        - `url` (URL): The URL to send data to.
        - `data` (object): The data to send in the request body.
        - `params` (Params, optional): Optional parameters to append to the URL query string.

3. **PUT Request**

    - **Description:** Updates data on a specified URL using a PUT request.
    - **Usage:**

        ```typescript
        FetchHelper.put(url: URL, data: object, params?: Params): Promise<any>
        ```

    - **Parameters:**
        - `url` (URL): The URL to update data on.
        - `data` (object): The data to send in the request body.
        - `params` (Params, optional): Optional parameters to append to the URL query string.

4. **PATCH Request**

    - **Description:** Partially updates data on a specified URL using a PATCH request.
    - **Usage:**

        ```typescript
        FetchHelper.patch(url: URL, data: object, params?: Params): Promise<any>
        ```

    - **Parameters:**
        - `url` (URL): The URL to partially update data on.
        - `data` (object): The data to send in the request body.
        - `params` (Params, optional): Optional parameters to append to the URL query string.

5. **DELETE Request**

    - **Description:** Deletes data from a specified URL using a DELETE request.
    - **Usage:**

        ```typescript
        FetchHelper.delete(url: URL, params?: Params): Promise<any>
        ```

    - **Parameters:**
        - `url` (URL): The URL to delete data from.
        - `params` (Params, optional): Optional parameters to append to the URL query string.

6. **PUT File Data**

    - **Description:** Uploads file data to a specified URL using a PUT request.
    - **Usage:**

        ```typescript
        FetchHelper.putFileData(url: URL, data: any, contentType: string): Promise<any>
        ```

    - **Parameters:**
        - `url` (URL): The URL to upload the file data to.
        - `data` (any): The file data to send in the request body.
        - `contentType` (string): The content type of the file data.

## Guidelines

1. **Keep a clean structure:** Maintain a clear and organized project structure. Use folders like pages, components, lib, hooks, styles, etc.
2. **Component organization:** Place reusable components in a components.
3. **Types and interfaces:** Maintain a types directory for TypeScript interfaces and types to keep your codebase organized.
4. **Use TypeScript:** Ensure type safety and reduce runtime errors also avoid any type while working with Typescript.
5. **Linting and formatting:** ESLint for linting and Prettier for consistent code formatting.
6. **Dynamic imports:** Use dynamic imports to lazy load components and reduce initial load time.
7. **Image optimization:** Use the built-in next/image component for automatic image optimization.
8. **Canonical URLs:** Ensure you set canonical URLs to avoid duplicate content issues.
9. **Sitemap:** Sitemap will be generated automatically, you just need to set the domain name which will help search engines index your pages efficiently.
10. **Global styles:** Use a global stylesheet or CSS-in-JS solutions like styled-components or emotion for global styles.
11. **Responsive design:** Ensure your application is responsive by using media queries and flexible layouts.
12. **Avoid inline styles:** Refrain from using inline styles to keep the code clean and maintainable.
13. **Error handling:** Implement proper error handling and validation.
14. **Unit tests:** Write unit tests for your components and utilities using Jest or similar testing frameworks.
15. **ARIA attributes:** Use ARIA attributes to enhance the accessibility of your application.
16. **Semantic HTML:** Use semantic HTML elements to improve the accessibility and SEO of your application.
17. **README:** Maintain a comprehensive README file to help developers understand your project.
18. **Comments:** Write clear comments in your code to explain complex logic.

## Troubleshooting

There might be some issues while using third party libraries. The reason behind this issue can be the implementation of CSP (Content Security Policy) Headers.
To resolve this you can add the required library resource / URL to headers.js file.  
More about CSP: [CSP Headers Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
