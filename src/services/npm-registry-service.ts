import axios from "axios";

export async function npmPackageSearch(packageName: string) {
  try {
    const response = await axios.get(
      `https://registry.npmjs.org-/v1/search?text=${packageName}&size=1`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function npmPackageInfo(packageName: string) {}
