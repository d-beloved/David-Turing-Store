/**
 * @description - Paginates the resource
 * @param {object} Resources - resource details
 * @param {Number} currentPage - Current page
 * @param {Number} limit - Page limit
 * @returns {object} pagination - Pagination object
 */

const pagination = ({
  count = 0, rows = []
}, currentPage, limit) => {
  const totalRecords = count;
  const totalPages = Math.ceil(totalRecords / limit);
  const newResource = Object.assign(
    {
    },
    {
      currentPage,
      currentPageSize: rows.length,
      totalPages,
      totalRecords
    }
  );
  return newResource;
};

export default pagination;
