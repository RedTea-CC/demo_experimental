interface PageInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

interface PaginationParams {
  pageNum: number;
  pageSize: number;
}

interface ResponseData {
  pageInfo?: PageInfo;
  [key: string]: any;
}

// Adapter for Go pagination data
export default function adapterGoPageData<T = any>(
  callback: (
    filter: Record<string, any>,
    pagination: PaginationParams,
    customParams?: any
  ) => Promise<{ data: ResponseData }>
) {
  return async (
    filter: Record<string, any>,
    pagination: PaginationParams,
    customParams?: any
  ) => {
    try {
      // Validate inputs
      if (!pagination?.pageNum || !pagination?.pageSize) {
        throw new Error("Invalid pagination parameters");
      }

      const cleanFilter = filter;
      const adaptedPagination = { ...pagination, page: pagination.pageNum };

      const response = await callback(
        cleanFilter,
        adaptedPagination,
        customParams
      );

      if (!response?.data) {
        throw new Error("Invalid response format");
      }

      const { data } = response;

      // Transform data structure if pageInfo exists
      const transformedData = data?.pageInfo
        ? {
            ...data,
            pageNum: data.pageInfo.page,
            pageSize: data.pageInfo.pageSize,
            total: data.pageInfo.total,
            pages: data.pageInfo.totalPage,
          }
        : data;

      return { data: transformedData };
    } catch (error) {
      console.error("Error in pagination adapter:", error);
      throw error;
    }
  };
}

adapterGoPageData((filter, pagination, customParams) => {
  return new Promise((resolve) => {
    resolve({
      data: { pageInfo: { page: 1, pageSize: 10, total: 100, totalPage: 10 } },
    });
  });
});
