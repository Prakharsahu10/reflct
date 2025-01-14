import { getCollection } from "@/actions/collection";
import DeleteCollectionDialog from "./_components/delete-collection";
import JournalFilters from "./_components/journal-filters";
const { getJournalEntries } = require("@/actions/journal");

const CollectionPage = async ({ params }) => {
  const { collectionId } = await params;
  const entries = await getJournalEntries({ collectionId });
  const collection = await getCollection(collectionId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold gradient-title">
            {collectionId === "unorganized"
              ? "Unorganized Entries"
              : collection?.name || "Collection"}
          </h1>
          {collection && (
            <DeleteCollectionDialog
              collection={collection}
              entriesCount={entries.data.entries.length}
            />
          )}
        </div>
        {collection?.description && (
          <h2 className="font-extralight p1-1">{collection?.description}</h2>
        )}
      </div>

      {/*render entries*/}
      <JournalFilters entries={entries.data.entries} />
    </div>
  );
};

export default CollectionPage;
