# SkyMart
React application with authentication, routing, product management (listing, filtering, 
sorting, searching), and an Add Product form. 

#### Deployed Link: https://skymat.netlify.app/

## Technology Used
- ReactJs,
- Javascript,
- Reduxt Toolkit (For State Manegement),
- React Hook Form (For Form Management),
- Tailwind CSS (For Designing)
- Json Dataset

## Feature
 - Authentication
   - Implemented Login & Signup (email + password). 
   -  Used Firebase Authentication.
   -  Authenticated users can access the app, unauthenticated users will be redirected to 
      /login
 - Routing
   -  /login → Login page (public). 
   -  /signup → Signup page (public). 
   - /products → Products list page (protected). 
   - /add-product → Add Product form page (protected). 
 - Products Page
   - Shown a list of products (useed a JSON dataset with 40 products). 
   - Displayed max 20 items per page (simple pagination).
   - Added Filters( Search by product name , Status,category ,price rage,filter by brand name)
 - Add Product Page (/add-product)
   - Added Form fields to add product in  product listing page

 ## Have a Look on ScreenShots
   
<img width="834" height="859" alt="signuppage" src="https://github.com/user-attachments/assets/2d097e00-53bf-4e91-b269-1e3d07084c38" />
<img width="864" height="778" alt="loginPage" src="https://github.com/user-attachments/assets/8630be27-b5d0-4a88-a95a-d30c12584387" />
<img width="1893" height="858" alt="productpage1" src="https://github.com/user-attachments/assets/c4d3a81b-f6c8-4369-8484-34578e7ad814" />
<img width="1892" height="876" alt="Furniture" src="https://github.com/user-attachments/assets/6bf3795f-e874-4ce2-87a4-3b5494da02ab" />
<img width="1890" height="887" alt="Electronics" src="https://github.com/user-attachments/assets/371579de-1dbd-439c-a4ec-de109686c27c" />
<img width="1892" height="887" alt="seacrh" src="https://github.com/user-attachments/assets/57f93df1-2514-4db4-a072-1e9291748622" />
<img width="1729" height="889" alt="addproduct" src="https://github.com/user-attachments/assets/307e52c7-a5f1-4ec2-be37-6b0a2ac8f7c7" />


