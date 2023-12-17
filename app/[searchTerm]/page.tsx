import getWikiResults from "@/lib/getWikiResults";
import Item from "@/app/[searchTerm]/components/Item";

type Props = {
    params: {
        searchTerm: string
    }
}

export async function generateMetadata({ params: { searchTerm } }: Props) {
    const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
    const data = await wikiData
    const displayTerm = searchTerm.replaceAll('%20', ' ')

    if (!data?.query?.pages) {
        return {
            title: `${displayTerm} Not Found`
        }
    }

    return {
        title: displayTerm,
        description: `Search results for ${displayTerm}`,
    }
}

export default async function SearchResults({params: { searchTerm } }: Props) {
    const wikiResult: Promise<SearchResult> = getWikiResults(searchTerm)
    const wikiData: SearchResult = await wikiResult
    const data: Result[] | undefined = wikiData?.query?.pages
    const displayTerm = searchTerm.replaceAll('%20', ' ')

    return (
        <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
            {data
                ? Object.values(data).map(
                    data => {
                        return <Item key={data.pageid} result={data}></Item>
                    }
                )
                : <h2 className="p-2 text-xl">{`${displayTerm} Not Found`}</h2>
            }
        </main>
    )
}