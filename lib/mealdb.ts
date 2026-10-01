export async function searchRecipes(
  ingredient: string
) {
  const response =
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

  const data =
    await response.json();

