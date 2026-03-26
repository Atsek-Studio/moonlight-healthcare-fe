import { ProductRepositoryImpl } from "../data/repositories/ProductRepositoryImpl";
import { ArticleRepositoryImpl } from "../data/repositories/ArticleRepositoryImpl";
import { ServiceRepositoryImpl } from "../data/repositories/ServiceRepositoryImpl";
import { PractitionerRepositoryImpl } from "../data/repositories/PractitionerRepositoryImpl";
import { FAQRepositoryImpl } from "../data/repositories/FAQRepositoryImpl";

import { GetAllProducts } from "../usecases/product/GetAllProducts";
import { GetProductById } from "../usecases/product/GetProductById";
import { FilterProducts } from "../usecases/product/FilterProducts";
import { GetProductCategories } from "../usecases/product/GetProductCategories";
import { GetFeaturedProducts } from "../usecases/product/GetFeaturedProducts";
import { GetAllArticles } from "../usecases/article/GetAllArticles";
import { GetAllServices } from "../usecases/service/GetAllServices";
import { GetServiceById } from "../usecases/service/GetServiceById";
import { GetAllPractitioners } from "../usecases/practitioner/GetAllPractitioners";
import { GetAllFAQs } from "../usecases/faq/GetAllFAQs";
import { SearchFAQs } from "../usecases/faq/SearchFAQs";

// Repository singletons
const productRepository = new ProductRepositoryImpl();
const articleRepository = new ArticleRepositoryImpl();
const serviceRepository = new ServiceRepositoryImpl();
const practitionerRepository = new PractitionerRepositoryImpl();
const faqRepository = new FAQRepositoryImpl();

// Use case singletons
export const getAllProducts = new GetAllProducts(productRepository);
export const getProductById = new GetProductById(productRepository);
export const filterProducts = new FilterProducts(productRepository);
export const getProductCategories = new GetProductCategories(productRepository);
export const getFeaturedProducts = new GetFeaturedProducts(productRepository);
export const getAllArticles = new GetAllArticles(articleRepository);
export const getAllServices = new GetAllServices(serviceRepository);
export const getServiceById = new GetServiceById(serviceRepository);
export const getAllPractitioners = new GetAllPractitioners(
  practitionerRepository,
);
export const getAllFAQs = new GetAllFAQs(faqRepository);
export const searchFAQs = new SearchFAQs(faqRepository);
