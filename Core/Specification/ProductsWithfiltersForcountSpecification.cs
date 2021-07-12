using Core.Entities;

namespace Core.Specification
{
    public class ProductsWithfFltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithfFltersForCountSpecification(ProductSpecParams productParams)
            : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {
        }
    }
}