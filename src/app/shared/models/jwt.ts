export interface JWT {
    exp: number
    user_name: string
    authorities: string[]
    jti: string
    client_id: string
    scope: string[]
}
