# **Hex**

https://github.com/arunavabasu-03/hex/assets/73842340/68a83944-39f1-4dd1-86fe-7b68fa3977f1

Hex is an innovative , minimalist model marketplace that empowers users to explore featured models and effortlessly showcase their own model information.

## **Tech Stack**

1. _Next.js_ : frontend and backend framework
2. _Shadcn UI_ : ui library 
3. _React Hook Form_ : form management and _Zustand_ : state management  
4. _PostgreSQL DB_ : storing model data 
5. _Redis_ : caching
6. _Vercel Blob_ : object storage

## Features

1. _Model Browsing_ : Explore a curated selection of featured models.
2. _Submit Your Model_ : Easily showcase your own model information on the platform.
3. _Browse Model Info_ : Dive into detailed information about various models.
4. _Search Convenience_ : Utilize a user-friendly search field for efficient model discovery.

### Optimizations

1. _API Response Optimization_: Ensuring  efficient responses from our API through caching.(7s -> 1s in first response and 450ms in second response ...)
2. _UI Performance_: Eliminating unnecessary UI re-renders for a smoother interface.(Load time - 950ms - 1sec on cached data  it is much faster)

## **Setup**

```bash 
# clone the repo 
git clone https://github.com/arunavabasu-03/hex.git

# navigate to the project directory
cd hex 

#install dependencies
yarn install 

#setup env 
cp cp .env.sample .env

# start app
yarn dev
```

## Contributing

Contributions to the hex are welcome! If you have any suggestions, improvements, or feature requests, please feel free to open an issue or submit a pull request on the GitHub repository.


## License

This project is licensed under the MIT License .
