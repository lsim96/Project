import { gql } from "@apollo/client";

export const GET_UNIQUE_BRAND = gql`
  query GetUniqueModel($brandId: ID!, $modelId: ID!) {
    findUniqueBrand(brandId: $brandId, modelId: $modelId) {
      id
      name
      origin
      image
      categories
      models {
        id
        name
        type
        image
        description
        price
        specs {
          bodyWood
          neckWood
          fingerboardWood
          pickups
          tuners
          scaleLength
          bridge
        }
        musicians {
          name
          musicImage
          bands
        }
      }
    }
  }
`;
