import { useWeb3Context } from '../context/'

export function Table() {
    const { network } = useWeb3Context()
    
    if (network) return (
        <table>
            <thead>
                <tr>
                    <th>Network</th>
                    <th>Chain ID</th>
                    <th>Block Number</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{network.name}</td>
                    <td>{network.chainId}</td>
                    <td>{network.ensAddress}</td>
                </tr>
            </tbody>
        </table>
    )
}