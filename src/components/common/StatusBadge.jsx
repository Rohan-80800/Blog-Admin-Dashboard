const StatusBadge = ({ status }) => {
  const styles = {
    published: "status-badge status-published",
    draft: "status-badge status-draft",
    deleted: "status-badge status-deleted"
  };

  const labels = {
    published: "Published",
    draft: "Draft",
    deleted: "Deleted"
  };

  return (
    <span className={styles[status] || styles.draft}>
      {labels[status] || status}
    </span>
  );
};

export default StatusBadge;
